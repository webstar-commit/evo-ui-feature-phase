const _ = require('lodash');
const bodyParser = require('body-parser');

const utils = require('../utils');
const felicityApi = require('../external/felicityApi');
const imagesApi = require('../external/imagesApi');
const AppInfo = require('../models/AppInfo');
const CurrentContainerStat = require('../models/CurrentContainerStat');
const HealthStats = require('../models/HealthStats');

var getApplicationStats = function (application) {
  return new Promise((resolve, reject) => {
    felicityApi.getApplicationStatus(application.appName).then(
      (result) => {
        application.status = result.data;
        resolve(application);
      },
      (error) => {
        console.error('Felicity error', error);
        resolve(application);
    });

    felicityApi.getApplicationByName(application.appName).then(
      (result) => {
        application.uptime = result.data.app && result.data.app.version;
        resolve(application);
      },
      (error) => {
        console.error('Felicity error', error);
        resolve(application);
    });

    CurrentContainerStat.count({'container.name': {$regex: `^/evo-${application.appName}`}}, (err, numberOfInstances) => {
      if(!err) {
        application.instances = numberOfInstances;
        resolve(application);
      } else {
        console.error(err);
        resolve(application);
      }
    });

    HealthStats.find({'container.name': {$regex: `^/evo-${application.appName}`}}, (err, stats) => {
      if(!err) {
        var errorCount = 0;
        _.each(stats, (stat) => {
            errorCount += stat.health;
        });
        application.errorCount = errorCount;
        resolve(application);
      } else {
        console.error(err);
        resolve(application);
      }
    });
  });
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

    if(req.body.appName == null || req.body.appExec == null || req.body.appImage == null) {
      res.send({error: true});
    } else {
      var application = {
        appName: req.body.appName,
        appExec: req.body.appExec,
        appImage: req.body.appImage,
      };
      req.body.appInstanceCount == null ? application.appInstanceCount = 1 : application.appInstanceCount = req.body.appInstanceCount;
      felicityApi.createApplication(application).then((result) => {
        const newAppInfo = new AppInfo({
          _id: newId,
          appName: application.appName,
          appExec: application.appExec,
          appImage: application.appImage,
          appType: 'application'
        });
        newAppInfo.save(function (err, createdApp) {
          if (!err) {
            console.log('the new app', createdApp);
            res.send({error: false, message: createdApp});
          } else {
            res.send({error: true, message: 'couldn\'t save to db'});
          }
        });
      }, (error) => {
        // Felicity error handler
        console.error('Felicity error occured', error);
      });
    }
  });

  app.get('/api/app_infos', (req, res) => {
    AppInfo.find().lean().exec(function (err, applications) {
      if(!err && applications.length > 0) {
        const numberOfApps = applications.length;
        var updatedApps = 0;
        _.each(applications, (application) => {
          getApplicationStats(application)
            .then(() => {
              updatedApps++;
              if (updatedApps == numberOfApps) {
                res.send(applications);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        });
      } else {
        res.send([]);
      }
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

  /**
   * @api GET /api/service_infos/count
   * Gets count of all the applications
   */
  app.get('/api/app_infos/count', function (req, res) {
    AppInfo.count().exec(function (err, count) {
      if(!err){
        res.send({count: count});
      }
    });
  });

  /**
   * @api DELETE /api/app_infos
   * Delete the application with selected id
   */
  app.delete('/api/app_infos/:id', (req, res) => {
    AppInfo.findByIdAndRemove(new Object(req.params.id), function(err, application_info) {
      if(err) {
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        });
      }else{
        felicityApi.deleteAllApplication(application_info.appName).then((felicityResult) => {
          res.json({
            type: true,
            data: 'Application info: ' + req.params.id + ", " + application_info.appName + " deleted successfully"
          });
        });
      }
    });
  });

  app.get('/api/app_images_list', (req, res) => {
    imagesApi.getAppImagesList().then((result) => {
      if(result.status == 200) {
        res.json({
          error: false,
          data: result.data.repositories,
        });
      } else {
        res.json({
          error: true
        })
      }
    });
  });

  console.log('Applications API initialized.');
}

module.exports = {
  initialize
};
