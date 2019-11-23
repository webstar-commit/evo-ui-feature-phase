const _ = require('lodash');

const utils = require('../utils');
const ServiceInfo = require('../models/ServiceInfo');
const GroupInfos = require('../models/GroupInfos');
const UserInfos = require('../models/UserInfos');

var getServiceOwnerName = function (service) {
  return new Promise((resolve, reject) => {
    if (service.svcOwner && service.svcOwner.startsWith("G")) {
      GroupInfos.findOne({"groupId": service.svcOwner}, (err, group) => {
        if(!err) {
          service.ownerName = group.groupName;
          resolve(service);
        } else {
          console.error(err);
          resolve(service);
        }
      });
    } else if (service.svcOwner && service.svcOwner.startsWith("U")) {
      UserInfos.findOne({"userId": service.svcOwner}, (err, user) => {
        if(!err) {
          service.ownerName = `${user.firstName} ${user.lastName}`;
          resolve(service);
        } else {
          console.error(err);
          resolve(service);
        }
      });
    } else {
      service.ownerName = '-';
      resolve(service);
    }
  });
}

function initialize(app) {

  /**
   * @api GET /api/service_infos
   * Gets all the services
   */
  app.get('/api/service_infos', function (req, res) {
    ServiceInfo.find().lean().exec(function (err, services) {
      if(!err){
        const numberOfServices = services.length;
        var updatedServices = 0;
        _.each(services, (service) => {
          getServiceOwnerName(service)
            .then(() => {
              updatedServices++;
              if(updatedServices == numberOfServices) {
                res.send(services);
              }
            });
        });
      }
    });
  });

  /**
   * @api POST /api/service_infos
   * Creates a new service
   */
  app.post('/api/service_infos', (req, res) => {
    const serviceData = {
      _id: utils.generateId(),
      svcName: req.body.svcName,
      svcOwner: req.body.svcOwner,
      svcApplications: _.map(req.body.svcApplications, (application) => application._id)
    };
    const newInstance = new ServiceInfo(serviceData);
    newInstance.save((err) => {
      if (err) {
        console.log('ERROR: ', err);
        res.sendStatus(500);
      } else {
        res.status(201).send(newInstance);
      }
    });
  });

  /**
   * @api GET /api/service_infos/count/:status
   * Gets count all the services with the give status (case-sensitive)
   */
  app.get('/api/service_infos/count/:status', function (req, res) {
    ServiceInfo.count({svcStatus: req.params.status}).exec(function (err, count) {
      if(!err){
        res.send({count: count});
      }
    });
  });

  /**
   * @api DELETE /api/service_infos
   * Creates a new service
   */
  app.delete('/api/service_infos/:id', (req, res) => {
    ServiceInfo.findByIdAndRemove(new Object(req.params.id), function(err, service_info) {
      if(err) {
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        });
      }else{
        res.json({
          type: true,
          data: 'Service info: ' + req.params.id + " deleted successfully"
        });
      }
    });
  });

  /**
   * @api PATCH /api/service_infos
   * Modifies given service
   */
  app.patch('/api/service_infos', (req, res) => {
    utils.crud.modify(ServiceInfo, req, res);
  });

  app.get('/api/service_infos/apps', function (req, res) {
    ServiceInfo.aggregate([{
      "$limit": 200
    }, {
      "$project": {
        svcApplications: 1
      }
    }, {
      "$unwind": '$svcApplications'
    }, {
      "$lookup": {
        from: 'app_infos',
        localField: 'svcApplications',
        foreignField: '_id',
        as: 'app_info'
      }
    }, {
      "$group": {
        _id: '$_id',
        apps: {
          "$push": '$app_info'
        }
      }
    }, {
      "$lookup": {
        from: 'service_infos',
        localField: '_id',
        foreignField: '_id',
        as: 'service_info'
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

  console.log('Services API initialized.');
}

module.exports = {
  initialize
};
