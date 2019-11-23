const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');

const utils = require('./utils');
const ServiceInfo = require('./models/ServiceInfo');
const AppInfo = require('./models/ServiceInfo');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST,PUT,GET,PATCH,DELETE");
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/evolute');



//app.get('/api/health/container/:lxc_id', function(req, res) {
//    console.log("someone hit /api/health/container");
//    console.log("health on container name: " + req.params.lxc_id + " to /api/health/container")
//
//    //    var lxc_id_norm = req.params.lxc_id.substring(0, 12);
//    console.log("container name to 12 characters: " + req.params.lxc_id);
//    //    console.log("logging request to /api/health/container ")
//    //            console.log(req)
//    request({
//        method: 'GET',
//        url: 'http://consul-api.evolute.io:8500/v1/health/node/' + req.params.lxc_id,
//        //     qs: {
//        //         name: req.query.name,
//        //         scale: req.query.scale,
//        //         cpu: req.query.cpu,
//        //         mem: req.query.mem,
//        //         cmd: req.query.cmd,
//        //         image: req.query.image
//        //     }
//    }, function(error, response, body) {
//        if (error) {
//            console.log("Made it to /api/health/container error")
//            res.json(502, {
//                error: "bad_gateway",
//                reason: err.code
//            });
//            return;
//        }
//        if (!error && response.statusCode == 200) {
//            //    console.log(body) // Show the HTML for the Google homepage.
//            console.log("logging response")
//                //            console.log(response)
//                //    res.json(data);
//            var parsedbody = JSON.parse(body);
//            console.log("parsing json of returned body")
//            console.log(parsedbody)
//            console.log("parsing json of returned body status")
//            console.log(parsedbody[0].Status)
//            res.send(body);
//            //            res.send(parsedbody[0].Status);
//        } else {
//            console.log("something else happened when querying /api/health/container brother")
//            console.log(response)
//            console.log(body)
//            res.send(body);
//        }
//
//    });
//
//});

//CLOSE
//app.use('/api/health/application/:app_id', function(req, res) {
//    console.log("someone hit /api/health/application/");
//    console.log("health on container name: " + req.params.app_id + " to /api/health/application/")
//
//    //    var lxc_id_norm = req.params.lxc_id.substring(0, 12);
//    //    console.log("container name to 12 characters: " + lxc_id_norm);
//    //    console.log("logging request to /api/health/container ")
//    //            console.log(req)
//    request({
//        method: 'GET',
//        url: 'http://consul-api.evolute.io:8500/v1/health/checks/' + req.params.app_id,
//        //     qs: {
//        //         name: req.query.name,
//        //         scale: req.query.scale,
//        //         cpu: req.query.cpu,
//        //         mem: req.query.mem,
//        //         cmd: req.query.cmd,
//        //         image: req.query.image
//        //     }
//    }, function(error, response, body) {
//        if (error) {
//            console.log("Made it to /api/health/application error")
//            res.json(502, {
//                error: "bad_gateway",
//                reason: err.code
//            });
//            return;
//        }
//        if (!error && response.statusCode == 200) {
//            //    console.log(body) // Show the HTML for the Google homepage.
//            console.log("logging response")
//                //            console.log(response)
//                //    res.json(data);
//                //            var parsedbody = JSON.parse(body);
//                //            console.log("parsing json of returned body")
//                //            console.log(parsedbody)
//                //            console.log("parsing json of returned body status")
//                //            console.log(parsedbody[0].Status)
//            res.send(body);
//            //            res.send(parsedbody[0].Status);
//        } else {
//            console.log("something else happened when querying /api/health/container brother")
//            console.log(response)
//            console.log(body)
//            res.send(body);
//        }
//
//    });
//
//});

//
//app.use('/api/application/:app_id/count', function(req, res) {
//    console.log("someone hit /api/application/:app_id/count");
//
//
//    var match = '/.*' + req.params.app_id + '.*/',
////    query={$project: {_id: 0,Names: 1,lxc_id: 1},"Names": match}
//    query={ $match:  {"Names": match} }
//
//   console.log("logging query")
//   console.log(query)
//currentContainerStats.aggregate([query
////    {
////     $project: {
////            _id: 0,
////            Names: 1,
////            lxc_id: 1
////    }
////        },
//////    WORKS{ $match:  {"Names": /.*evo-cassandra-seed.*/}}
////    { $match:  {"Names": /.*(req.params.app_id).*/}}
////
//////    {
//////        $match:
//////                {"Names": '/.*evo-cassandra-seed.*/'}
//////        {"Names": '/.*' + req.params.app_id + '.*/'}
////
//////        {"Names": new RegExp('^'+req.params.app_id+'$', "i")}
//////    }
//
// ], function(err, result) {
//        if (err) {
//            console.log("error detected")
//            console.log(err);
//            return;
//        }
//        console.log("no errors, logging results")
//        console.log(result);
////    console.log('/.*' + req.params.app_id + '.*/')
////    console.log(new RegExp('^'+req.params.app_id+'$', "i"))
//
//        res.json(result);
//    });
//
//});


const server = app.listen(3000);


const newId = utils.generateId();
const CVX_DataLake3 = new ServiceInfo({
  _id: newId,
  svcName: 'CVX_DataLake3',
  svcStatus: 'Undeployed',
  svcOwner: 'Jason Bourne',
  svcHealth: 'Healthy',
  svcUptime: 'Not Applicable',
  svcApplications: [{
    _id: "57c5eec4a339f1dc3ffd08d0"
  }, {
    _id: "57c5eecba339f1dc3ffd08d1"
  }]
});

console.log(CVX_DataLake3);

console.log("starting nested query");
ServiceInfo.find().limit(50).exec(function (err, results) {
  console.log("inside nested query");

  const ids = results.map(function (el) {
    return el._id
  });
  console.log("found the following service ids: " + ids);
  const appIds = results.map(function (el) {
    return el.svcApplications;
  });
  console.log("found the following application ids " + appIds);

  console.log("maintained variable appIds: " + appIds);
  appIds.forEach(function (doc) {
    AppInfo.find({
      "_id": {
        "$in": doc
      }
    }, function (err, items) {
      console.log("found the following applications: " + items);
    })

  })

});

console.log("Opening up connection to MongoDB");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

const routes = {
  applications: require('./routes/applications'),
  containers: require('./routes/containers'),
  containerStats: require('./routes/containerStats'),
  services: require('./routes/services'),
  aggregation: require('./routes/aggregation'),
  visualizations: require('./routes/visualizations'),
  hostRings: require('./routes/hostRings'),
  dashboard: require('./routes/dashboard')
};

_.each(routes, (route) => {
  route.initialize(app, mongoose);
});
