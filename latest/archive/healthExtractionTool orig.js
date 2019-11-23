const configuration = {
  debug: false,
  mongo: {
    url: 'mongodb://localhost:27017/evolute',
    targetCollectionName: 'health_stats'
  },
  healthApiBaseUrl: 'http://health-api.evolute.io:8500/v1/health/node/',
  pollingIntervalMillis: 3000,
  nodeListReloadIntervalMillis: 60000
};

const _ = require('lodash');
const q = require('q');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');

let mongoDatabase;
let targetMongoCollection;
let nodeList = [];

function currentTime() {
  return new Date();
}

function loadNodeList() {
  const deferred = q.defer();
  mongoDatabase.collection('container_stats_current').aggregate([
    {
      $group: {
        _id: '$lxc_id',
        containerName: {$first: '$Names'}
      }
    },
    {
      $project: {
        _id: '$_id',
        containerName: {$arrayElemAt: ['$containerName', 0]}
      }
    }
  ]).toArray((error, result) => {
    console.log('Node list reloaded: ', result);
    nodeList = result;
    deferred.resolve(nodeList);
  });

  return deferred.promise;
}

function pollSingleNode(node) {
  const url = configuration.healthApiBaseUrl + node.containerName;
  //const url = `http://localhost:8500/v1/health/node/${node}`;
  request({
    method: 'GET',
    url: url
  }, (error, response, body) => {
    if (error) {
      console.warn('ERROR', error);
    } else {
      const parsedBody = JSON.parse(body);
      const status1 = parsedBody[0].Status;
      const status2 = parsedBody[1].Status;
      const health = (() => {
        const okStatus = 'passing';
        if (status1 === okStatus && status2 === okStatus) {
          return 1;
        } else if (status1 === okStatus || status2 === okStatus) {
          return 0.5;
        } else {
          return 0;
        }
      })();
      const documentToInsert = {
        lxcId: node._id,
        containerName: node.containerName,
        time: currentTime(),
        status1,
        status2,
        health: health
      };
      targetMongoCollection.insert(documentToInsert);
    }
  });

}

function pollAllNodes() {
  nodeList.forEach((node) => {
    pollSingleNode(node);
  });
}

function startApiPolling() {
  setInterval(() => {
    pollAllNodes();
  }, configuration.pollingIntervalMillis);
}

function startNodeListReloading() {
  setInterval(() => {
    loadNodeList();
  }, configuration.nodeListReloadIntervalMillis);
}

MongoClient.connect(configuration.mongo.url).then((db) => {
  mongoDatabase = db;
  return db.createCollection(configuration.mongo.targetCollectionName).then((targetCollection) => {
    targetMongoCollection = targetCollection;
    loadNodeList().then(() => {
      startApiPolling();
      startNodeListReloading();
      console.log('Health Data Extraction Tool started.');
    });
  });
});

