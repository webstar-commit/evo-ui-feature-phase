const _ = require('lodash');
const q = require('q');
var request = require('request');
const axios = require('axios');
const healthApi = require('../external/healthApi');
//const evoluteConfig = require('./evolute.conf');
const PropertiesParser = require ('properties-parser');

const evoluteConf = PropertiesParser.read('./evolute.conf')

//console.log("Logging Evolute Config Network Prefix")
//console.log(evoluteConf.net_prefix)
evoluteConf.net_prefixParsed = evoluteConf.net_prefix.replace(/\"/g, "");

console.log('Dashboard API initialized.');

axios.get('http://localhost:3000/api/container_infos/count')
  .then(function(response) {
    console.log("Number of Current Running Containers: " + response.data);
//    console.log(response.status);
//    console.log(response.statusText);
//    console.log(response.headers);
//    console.log(response.config);
  });

axios.get('http://health-api.evolute.io:8500/v1/agent/members')
  .then(function(response) {
//    console.log(response.data);
    var serverCount=0
var json = response.data
//console.log("Logging json variable")
//WORKSconsole.log(json)
    for(var i = 0; i < json.length; i++) {
//WORKS        console.log("Object " + i + ": ")
    var obj = json[i];


        if (obj.Addr.match(evoluteConf.net_prefixParsed)){
//            console.log("Server Found: " + obj.Addr)
            serverCount++;
        }

// WORKS   console.log(obj.Addr);
}

    console.log("Number of Host Listed in Health API: " + serverCount)
  });


axios.get('http://localhost:3000/api/hostRing_infos/count')
  .then(function(response) {
    console.log("Number of Host Rings: " + response.data);
//    console.log(response.status);
//    console.log(response.statusText);
//    console.log(response.headers);
//    console.log(response.config);
  });
