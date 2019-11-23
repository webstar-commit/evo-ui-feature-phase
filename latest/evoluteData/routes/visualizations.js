const _ = require('lodash');
const q = require('q');
var request = require('request');

function initialize(app) {
  app.get('/api/visualizations/applicationOverview', (req, res) => {
    res.send(require('./mockData/visualizations-applicationOverview.json'));
  });

  app.get('/api/visualizations/systemUtilizationOverviewMock', (req, res) => {
    res.send(require('./mockData/visualizations-systemUtilizationOverview.json'));
  });
    
    app.get('/api/visualizations/containerUtilizationOverviewMock', (req, res) => {
    res.send(require('./mockData/visualizations-containerUtilizationOverview.json'));
  });
    
    app.get('/api/visualizations/systemUtilizationOverview', function(req, res) {
     request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/container_stats/aggregated/2016-08-01/2016-09-01/hour/all_containers/all_values'
    }, function(error, response, body) {
        if (error) {
            console.log("Error on /api/visualizations/applicationOverview")
            res.json(502, {
                error: "bad_gateway",
                reason: err.code
            });
            return;
        }
        if (!error && response.statusCode == 200) {
res.send(body);
     

        
            



        } else {
            console.log("something else happened when querying /api/health/container brother")
            console.log(response)
            console.log(body)
            res.send(body);
        }

    });
   
    
    
});

    
    
    app.get('/api/visualizations/serviceAppsWheel', function(req, res) {
     request({
        method: 'GET',
        url: 'http://localhost:3000/api/service_infos/apps'
    }, function(error, response, body) {
        if (error) {
            console.log("Error on /api/visualizations/serviceApps")
            res.json(502, {
                error: "bad_gateway",
                reason: err.code
            });
            return;
        }
        if (!error && response.statusCode == 200) {
res.send(body);
     

        
            



        } else {
            console.log("something else happened when querying /api/health/container brother")
            console.log(response)
            console.log(body)
            res.send(body);
        }

    });
   
    
    
});

    
    
  console.log('Visualizations API initialized.');
}

module.exports = {
  initialize
};


