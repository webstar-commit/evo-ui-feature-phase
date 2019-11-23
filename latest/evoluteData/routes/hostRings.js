"use strict";
const request = require('request');

const HostRingInfo = require('../models/HostRingInfo');


function initialize(app) {

  app.get('/api/hostRing_infos', function (req, res) {
      console.log("/api/hostRing_infos Queried")
    HostRingInfo.find(function (err, data) {
      res.json(data);
    });

  });

  app.get('/api/hostRing_infos/count', function (req, res) {
//      console.log("/api/hostRing_infos/count Queried")
    HostRingInfo.count(function (err, data) {
      res.json({count: data});
    });

  });
  console.log('Host Rings API initialized.');
}

module.exports = {
  initialize
};
