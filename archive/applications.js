const request = require('request');
const _ = require('lodash');
const q = require('q');

const utils = require('../utils');
const felicityApi = require('../external/felicityApi');
const healthApi = require('../external/healthApi');
const AppInfo = require('../models/AppInfo');
const CurrentContainerStat = require('../models/CurrentContainerStat');

function getApplicationErrors(appName) {
  function extractHealthResult(healthApiResult) {
    if (healthApiResult) {
      return _.filter(healthApiResult, (item) => item.Status !== 'passing').length;
    } else {
      return 0;
    }
  }
  const deferred = q.defer();
  CurrentContainerStat.find({}, 'container.name', (err, currentContainerStats) => {
    if (err) {
      deferred.reject(err);
    } else {
      const containerNamePrefix = '/evo-' + appName;
      const applicationContainersStats = _.filter(currentContainerStats,
        (stat) => stat.container && _.startsWith(stat.container.name, containerNamePrefix));
      const deferredHealthRequests = _.map(applicationContainersStats,
        (containerStats) => healthApi.getContainerHealth(containerStats.container.name.substring(1)));
      q.all(deferredHealthRequests).then((results) => {
        const sum = _.reduce(results, (total, x) => total + extractHealthResult(x.data), 0);
        deferred.resolve(sum);
      }, (healthApiError) => {
        deferred.reject(healthApiError);
      });
    }
  });
  return deferred.promise;
}

function initialize(app) {

  // TODO remove this later
  app.get('/api/applications/test', (req, res) => {
    getApplicationErrors('evo-cassandra-seed').then((result) => {
      res.send({errorCount: result});
    }, (error) => {
      console.error('Error', error);
      res.send({error: true});
    });
  });

  app.post('/api/app_infos', (req, res) => {
    var newId = utils.generateId();
    felicityApi.createApplication(req.body).then((felicityResult) => {
        console.log("logging felicityResult")
        console.log(felicityResult)
      const newAppInfo = new AppInfo({
        _id: newId,
        appName: req.body.appName,
          appExec: req.body.appExec,
          appType: 'application'
          
        //appStatus: req.body.appStatus,
        //appHealth: req.body.appHealth,
        //appUptime: req.body.appUptime
      });
      newAppInfo.save(function (err, createdApp) {
          console.log("logging created app")
          console.log(createdApp)
        res.send(createdApp);
      });
    }, (error) => {
      // Felicity error handler
      console.error('Felicity error occured', error);
    });

  });

  app.use('/api/application/:app_id/count', function (req, res) {
    var querystring = `^${req.params.app_id}`;
//var query = `$(/${querystring}.*/)`
    var regEx = new RegExp(querystring);
    var containerNames = [];
    var testarray = [];
    request({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/container_stats/current'
    }, function (error, response, body) {
      if (error) {
        console.log("Made it to /api/application/:app_id/count2 error");
        res.json(502, {
          error: "bad_gateway",
          reason: err.code
        });
        return;
      }
      if (!error && response.statusCode == 200) {
        var responseString = (JSON.stringify(response));
        var responseJSON = JSON.parse(responseString);
        var containers = responseJSON.body;
        var containersJSON = JSON.parse(containers);

        containersJSON.forEach(function (containerItem, index, arr) {
          containerNames.push(containerItem.Names)
        });

        containerNames.forEach(function (containerNamesItem, index, arr) {
          var containerNamesItemElement = containerNamesItem[0];
          if (containerNamesItemElement.match(regEx)) {
            testarray.push(containerNamesItemElement)
          }
          return testarray.length;
        });

        console.log("loggin test array length");
        console.log(testarray.length);
        res.json(testarray.length);
      } else {
        console.log("something else happened when querying /api/health/container brother");
        console.log(response);
        console.log(body);
        res.send(body);
      }
    });
  });

  app.get('/api/app_infos', (req, res) => {
    AppInfo.find(function (err, applications) {
      felicityApi.getAllApplications().then((felicityResult) => {
        const felicities = felicityResult.data.apps;
        const applicationsWithFelicity = _.map(applications, (application) => {
          // NOTE the algorithm is full scan here, it can be optimized
          const felicity = _.find(felicities, (felicity) => felicity.id === '/' + application.appName);
          return felicity ? _.defaults({
            _id: application._id,
            appName: application.appName,
          }, {felicity}) : application;
        });
        const applicationErrorRequests = _.map(applicationsWithFelicity,
          (application) => getApplicationErrors(application.appName));
        q.all(applicationErrorRequests).then((errorCounts) => {
          _.each(applicationsWithFelicity, (application, index) => {
            const errorCount = errorCounts[index];
            _.isNumber(errorCount) && (application.errorCount = errorCount);
          });
          res.send(applicationsWithFelicity);
        }, (error) => {
          res.send(applicationsWithFelicity);
        });

      });

    });
  });

  app.patch('/api/app_infos', (req, res) => {
    AppInfo.findOne({_id: req.body._id}).then((currentAppInfo) => {
      const appInstanceCount = req.body.appInstanceCount;
      if (appInstanceCount) {
        // We need to update instance count via Felicity API call
        felicityApi.scaleApplication(currentAppInfo.appName, appInstanceCount).then((felicityResult) => {
          // TODO improve call result
          res.send({});
        }, (error) => {
          // Felicity error handler
          console.error('Felicity error occurred', error);
        });
      }
    });

  });

  console.log('Applications API initialized.');
}

module.exports = {
  initialize
};

