const configuration = {
    debug: false,
    mongo: {
        url: 'mongodb://localhost:27017/evolute',
        targetCollectionName: 'error_stats'
    },
    healthApiBaseUrl: 'http://health-api.evolute.io:8500/v1/health/node/',
    pollingIntervalMillis: 3000,
    nodeListReloadIntervalMillis: 60000
};

const _ = require('lodash');
const q = require('q');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const moment = require('moment');
const now = moment();

const nowMinus30 = now.subtract('seconds', 1);
const nowMinus30Unix = nowMinus30.unix();
console.log("Logging Unix timestamp 30 seconds ago")
console.log(nowMinus30Unix)

let mongoDatabase;
let targetMongoCollection;
let nodeList = [];

function currentTime() {
    return new Date();
}

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
    console.log("Current Node")
    console.log(node)
        //  const url = configuration.healthApiBaseUrl + node.containerName;
        //   STATIC WORKS const url = `http://evo104.evolute.io:4243/containers/60242/logs?stderr=1&stdout=1&timestamps=1&follow=0`;
        //    const url = "http://" + node.host + ":4243/containers/" + node.containerName + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&since=" + nowMinus30Unix;
    const url = "http://" + node.host + ":4243/containers/" + node.containerName + "/logs?stderr=1&stdout=1&timestamps=1&follow=0";

    //const url = `http://localhost:8500/v1/health/node/${node}`;
    request({
        method: 'GET',
        url: url
    }, (error, response, body) => {
        if (error) {
            console.warn('ERROR', error);
        } else {
            const parsedBody = body;
            //        const parsedBody = JSON.parse(body);
            //      const status1 = parsedBody[0].Status;
            //      const status2 = parsedBody[1].Status;
            const logs = body;
            //        console.log("logging logs");
            //        console.log(logs);
            match = logs.match(/(20[0-9][0-9].* no .*)$/gmi);
            console.log("logging no")
                //        match = logs.match(/(20[0-9][0-9].* error .*)$/gmi);
                //        console.log("logging error")
            console.log(match)
                //        errorCount = match.split(/\r\n|\r|\n/).length
                //        var lines = match.val().split("\n");  
                //        var errorCount = lines.length;
                //        var type = match.prototype.toString.call(t)
                //        console.log("logging number of error lines")
                //        console.log(errorCount)
            console.log("match type is")
            console.log(typeof match)
            var getKeys = function(obj) {
                var keys = [];
                for (var key in obj) {
                    keys.push(key);
                }
                // IMPORTANT DEBUG           console.log("logging keys and values")
                console.log("logging keys")
                console.log(keys)
                    //            console.log(keys[0])
                    //            console.log("logging number of keys found")
                    //            console.log(keys.length)
                return keys.length;

            }
            console.log("trying to log match value")
                //        console.log(match[0])
            if (match) {
                console.log("found a match")
                console.log(match[0])
                    //            errorCount = match[0].length
                var lines = match[0].split(/\r\n|\r|\n/);
                console.log("Printing each log lined that matched")
                console.log("typeof lines")
                console.log(typeof lines)
                const truncateTimeToMinutes = (time) => time.substring(0, 16);
                //            var errorCount = lines.length;
                console.log("number of error lines")
                    //            console.log(errorCount)
                    //            console.log(getKeys.length)
                var getKeysResult = getKeys(match)
                var errorCount = getKeysResult;
                console.log(getKeysResult)
                for (var i = 0; i < getKeysResult; i++) {

                    //    console.log(lines[i])
                    //                 console.log("Printing each match object by i")
                    console.log("Printing each match line")
                    console.log(match[i])
                    line = match[i]
                        //               const truncateTimeToMinutes = (time) => time=line.substring(0, 16);
                    var timestamp = line.substring(0, 16);
                    console.log("timestamp")
                    console.log(timestamp)
                }
            }



            //          console.log("executing getKeys")
            //            var getKeysResult=getKeys(match)
            //           console.log(getKeysResult)
            //           
            //      const health = (() => {
            //        const okStatus = 'passing';
            //        if (status1 === okStatus && status2 === okStatus) {
            //          return 1;
            //        } else if (status1 === okStatus || status2 === okStatus) {
            //          return 0.5;
            //        } else {
            //          return 0;
            //        }
            //      })();
            const documentToInsert = {
                lxcId: node._id,
                containerName: node.containerName,
                time: currentTime(),
                timestamp: timestamp,
                //        status1,
                //        status2,
                errorCount: errorCount
            };
            targetMongoCollection.insert(documentToInsert);
        }
    });

}

function pollAllNodes() {
    nodeList.forEach((node) => {
        console.log("Current node pollAllNodes")
        console.log(node)
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
            console.log('Error Data Extraction Tool started.');
        });
    });
});