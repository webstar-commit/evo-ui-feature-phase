const request = require('request');

const ContainerInfo = require('../models/ContainerInfo');
const CurrentContainerInfo = require('../models/CurrentContainerInfo');

function initialize(app) {
  app.use('/api/container', function (req, res) {
    console.log("someone hit /api/container");
    console.log("user sent name: " + req.query.name + " to /api/container");

    console.log("logging request to /api/container ");
    console.log(req);
    request({
      method: 'GET',
      url: 'http://felicity.evolute.io',
      qs: {
        name: req.query.name,
        scale: req.query.scale,
        cpu: req.query.cpu,
        mem: req.query.mem,
        cmd: req.query.cmd,
        image: req.query.image
      }
    }, function (error, response, body) {
      if (error) {
        console.log("Made it to error");
        res.json(502, {
          error: "bad_gateway",
          reason: err.code
        });
        return;
      }
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        console.log("something else happened brother");
        console.log(response);
        console.log(body);
        res.send(body);
      }

    });
  });

  app.get('/api/container_infos', function (req, res) {
    //    WORKS containerInfos.findOne(function (err, data) {
    ContainerInfo.find(function (err, data) {
      res.json(data);
    }).limit(50);
    //.sort({'lxc_id': 1, 'date': -1})
  });

  app.get('/api/container_infos/current', function (req, res) {
    CurrentContainerInfo.find(function (err, data) {
      res.json(data);
    })
  });
    
      app.get('/api/container_infos/count', function (req, res) {
    CurrentContainerInfo.count(function (err, data) {
      res.json(data);
    })
  });


  app.get('/api/container_infos/test', function (req, res) {
    ContainerInfo.aggregate([{
      "$limit": 200
    }, {
      $sort: {
        'lxc_id': 1,
        'date': -1
      }
    }, {
      $group: {
        '_id': "$lxc_id",
        lastDate: {
          $last: "$ReadTime"
        }
      }
    }], function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      res.json(result);
    });
  });

  console.log('Containers API initialized.');
}

module.exports = {
  initialize
};
