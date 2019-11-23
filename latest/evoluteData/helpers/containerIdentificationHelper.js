const _ = require('lodash');
const mongoose = require('mongoose');

const CurrentContainerInfo = require('../models/CurrentContainerInfo');

let lxcIdToContainerName = {};
let containerNameToLxcId = {};

function initialize() {
  // TODO Names and lxc_id are not one-to-one
  return CurrentContainerInfo.aggregate([
    {
      $group: {
        _id: '$lxc_id',
        lxcId: {$first: '$lxc_id'},
        containerName: {$first: '$Names'}
      }
    }
  ]).then((items) => {
    lxcIdToContainerName = {};
    containerNameToLxcId = {};
    items.forEach((item) => {
      lxcIdToContainerName[item.lxcId] = item.containerName;
      containerNameToLxcId[item.containerName] = item.lxcId;
    });
  });
}

function lxcIdByContainerName(containerName) {
  return containerNameToLxcId[containerName];
}

function containerNameByLxcId(lxcId) {
  return lxcIdToContainerName[lxcId];
}

module.exports = {
  initialize,
  lxcIdByContainerName,
  containerNameByLxcId
};

