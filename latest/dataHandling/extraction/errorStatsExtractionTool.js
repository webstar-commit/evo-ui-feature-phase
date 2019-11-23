const configuration = {
  debug: true,
  mongo: {
    url: 'mongodb://localhost:27017/evolute',
    targetCollectionName: 'error_stats'
  },
  currentPolicyName: 'http',
  loadPolicy: {
    fileSystem: {
      basePath: '/var/lib/docker/containers/',
      glob: '**/*-json.log'
    },
    http: {
      healthApiBaseUrl: 'http://health-api.evolute.io:8500/v1/health/node/',
      pollingIntervalMillis: 30000,
      nodeListReloadIntervalMillis: 4000
    }
  }
};

const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const q = require('q');
const glob = require('glob');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;


let mongoDatabase;

// Import error matching rules
const rules = require('./errorStatsExtractionTool.rules');

const isErrorLine = (line) => _.some(rules, (rule) => rule(line));

const normalizeContainerName = (containerName) => _.startsWith(containerName, '/') ? containerName.substring(1) : containerName;

function initiateHttpPolling(options, listener) {
  let nodeList = [];

  /**
   * Load container list
   * @returns {*|promise}
   */
  function loadNodeList() {
    const deferred = q.defer();
    mongoDatabase.collection('current_container_stats').aggregate([{
      $group: {
        _id: '$container.id',
        containerName: {
          $push: '$container.name'
        },
        host: {
          $push: '$host.node'
        }
      }
    }, {
      $project: {
        _id: '$_id',
        containerName: {
          $arrayElemAt: ['$containerName', 0]
        },
        host: {
          $arrayElemAt: ['$host', 0]
        }
      }
    }]).toArray((error, result) => {
      nodeList = result;
      deferred.resolve(nodeList);
    });
    return deferred.promise;
  }

  /**
   * Polls all the containers for error logs
   */
  function pollAllNodes() {
    nodeList.forEach((node) => {
      pollSingleNode(node);
    });
  }

  /**
   * Poll the given container for error longs and put pass the errors to listeners
   * @param node
   */
  function pollSingleNode(node) {
    const lxcId = node._id;
    const containerName = normalizeContainerName(node.containerName);

    // Get time 30 seconds before now
    // TODO change to 30 seconds:
    //const since = moment().subtract(1, 'days').unix();
    const since = moment().subtract(1, 'year').unix();

    const url = `http://${node.host}:4243/containers/${containerName}/logs?stderr=1&stdout=1&timestamps=1&follow=0&since=${since}`;
    configuration.debug && console.log('Querying ', url);
    axios.get(url).then((response) => {
      const logsAsMultilineText = response.data;
      const lines = logsAsMultilineText.split(/\r\n|\r|\n/);
      const matchedLines = _.filter(lines, (line) => isErrorLine(line));
      configuration.debug && console.log(`For container ${containerName} matched lines are`, matchedLines);
      listener.onContainerErrorsGot(matchedLines, lxcId, containerName);
    }, (error) => {
      console.log('ERROR', error);
    });
  }

  function startApiPolling() {
    setInterval(() => {
      pollAllNodes();
    }, options.pollingIntervalMillis);
  }

  function startNodeListReloading() {
    setInterval(() => {
      loadNodeList();
    }, options.nodeListReloadIntervalMillis);
  }

  // Start node list reloading and error polling
  startNodeListReloading();
  startApiPolling();

}


const loadPolicies = {
  fileSystem: function (options, listener) {
    function readErrorsFromFile(filePath) {
      const deferred = q.defer();
      let errors = [];
      const lineReader = readline.createInterface({
        input: fs.createReadStream(filePath)
      });
      lineReader.on('line', (line) => {
        isErrorLine(line) && errors.push(JSON.parse(line));
      });
      lineReader.on('close', () => {
        deferred.resolve(errors);
      });
      return deferred.promise;
    }

    glob(options.glob, {cwd: options.basePath, realpath: true}, (error, files) => {
      let processedFileCount = 0;
      files.forEach((filePath) => {
        const logFileName = path.basename(filePath);
        const lxcId = logFileName.substring(0, logFileName.length - '-json.log'.length);
        readErrorsFromFile(filePath).then((errors) => {
          listener.onContainerErrorsGot(errors, lxcId).then(() => {
            (++processedFileCount === files.length) && listener.onFinish();
          });
        });
      });

    });
  },
  http: function (options, listener) {
    initiateHttpPolling(options, listener);
  }
};

const loadPolicyName = () => configuration.currentPolicyName;

function processErrors() {
  const deferred = q.defer();
  const policyName = loadPolicyName();
  const loadPolicy = loadPolicies[policyName];
  loadPolicy(configuration.loadPolicy[policyName], {
    onContainerErrorsGot(errors, lxcId, containerName) {
      const truncateTimeToMinutes = (time) => time.substring(0, 16);
      const timeRegExp = /\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}/;
      const extractTime = (error) => {
        if (_.isObject(error)) {
          return error.time;
        } else {
          const matches = error.match(timeRegExp);
          return matches && matches.length > 0 ? matches[0] : '';
        }
      };
      const groupedErrorCounts = _.countBy(errors, (error) => truncateTimeToMinutes(extractTime(error)));
      return storeErrorStatToMongo(groupedErrorCounts, lxcId, containerName);
    },
    onFinish() {
      deferred.resolve({});
    }
  });
  return deferred.promise;
}

let targetMongoCollection;
function storeErrorStatToMongo(groupedErrorCounts, lxcId, containerName) {
  const deferred = q.defer();
  const documentsToInsert = _.map(groupedErrorCounts, (errorCount, time) => ({errorCount, time, lxcId, containerName}));
  configuration.debug && console.log('Inserting... ', documentsToInsert);
  if (_.isEmpty(documentsToInsert)) {
    deferred.resolve();
  } else {
    targetMongoCollection.insertMany(documentsToInsert).then(() => {
      deferred.resolve();
    }, (error) => {
      console.log('MONGO ERROR', error);
    });
  }
  return deferred.promise;
}

MongoClient.connect(configuration.mongo.url).then((db) => {
  mongoDatabase = db;
  return db.createCollection(configuration.mongo.targetCollectionName).then((targetCollection) => {
    targetMongoCollection = targetCollection;
    processErrors().then(() => {
      console.log('Completed.');
      db.close();
    });
  });
});

