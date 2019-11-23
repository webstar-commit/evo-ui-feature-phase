const _ = require('lodash');
const q = require('q');
var request = require('request');
const axios = require('axios');
const healthApi = require('../external/healthApi');
//const evoluteConfig = require('./evolute.conf');
const PropertiesParser = require('properties-parser');

const evoluteConf = PropertiesParser.read(process.cwd() + '/routes/evolute.conf')


console.log("Logging Evolute Config Network Prefix")
console.log(evoluteConf.net_prefix)
//evoluteConf.net_prefixParsed = evoluteConf.net_prefix + '\.';
evoluteConf.net_prefixParsed = evoluteConf.net_prefix.replace(/\"/g, "");
//evoluteConf.net_prefixParsed = evoluteConf.net_prefixParsed.replace(/\"/g, "");
console.log("Logging UPDATED Evolute Config Network Prefix")
console.log(evoluteConf.net_prefixParsed)


function initialize(app) {

  app.get('/api/dashboard/host_count', function (req, res) {
      // console.log("/api/dashboard/host_count Queried")
      hostCount = 0
      //axios.get('http://evo1.localdomain:8500/v1/agent/members')
      axios.get('http://health-api.evolute.io:8500/v1/agent/members')
        .then(function(response) {
        //    console.log(response.data);
        var serverCount=0
        var json = response.data
        for(var i = 0; i < json.length; i++) {
          var obj = json[i];
            if (obj.Addr.match(evoluteConf.net_prefixParsed)){
              serverCount++;
            }
        }
        res.json({count: serverCount});
        // console.log("Number of Host Listed in Health API: " + serverCount)
      }).catch(function(error) {
        // console.log(error)
        res.status(400).send("Uh oh, something went bad");
      });
  });

  app.get('/api/dashboard/images_count', function (req, res) {
      // console.log("/api/dashboard/images_count Queried")
      hostCount = 0
      axios.get('http://images.evolute.io:5000/v2/_catalog')
        .then(function(response) {
        imagesCount = response.data["repositories"].length;
        res.json({count: imagesCount});
        // console.log("Number of Images Listed in Images API: " + imagesCount)
      }).catch(function(error) {
        // console.log(error)
        res.status(400).send("Uh oh, something went bad");
      });
  });
}

module.exports = {
  initialize
};
