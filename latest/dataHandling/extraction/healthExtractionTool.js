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


//
//function loadNodeList() {
//  const deferred = q.defer();
//  mongoDatabase.collection('container_stats_current').aggregate([
//    {
//      $group: {
//        _id: '$lxc_id',
//        containerName: {$first: '$Names'}
//      }
//    },
//    {
//      $project: {
//        _id: '$_id',
//        containerName: {$arrayElemAt: ['$containerName', 0]}
//      }
//    }
//  ]).toArray((error, result) => {
//    console.log('Node list reloaded: ', result);
//    nodeList = result;
//    deferred.resolve(nodeList);
//  });
//
//  return deferred.promise;
//}


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
            console.log("logging body")
            console.log(body)
            const parsedBody = JSON.parse(body);
            
            var status1
            var status2

            try {
                if (parsedBody[0].Status) {
                    status1 = parsedBody[0].Status;
                    status2 = parsedBody[1].Status;
                    console.log("logging status in if")
                    console.log(status1)
                    console.log(status2)
                }
            } catch (err) {
                console.log("error detected")
            }
            console.log("logging status")
            console.log(status1)
            console.log(status2)

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

