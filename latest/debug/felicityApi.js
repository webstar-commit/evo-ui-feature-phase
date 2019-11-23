const _ = require('lodash');
const axios = require('axios');

const baseUrl = 'http://felicity.evolute.io';
//const baseUrl = 'http://localhost:8001';

function paramsToString(params) {
  // TODO escape values as they come from user input
  return _.map(params, (val, key) => key + '=' + val).join('&');
}

function url(params) {
  return _.isEmpty(params) ? baseUrl + '/' : baseUrl + '/?' + paramsToString(params);
}

function getAllApplications() {
  return axios.get(url());
}

function createApplication(application) {
  const params = {
    name: application.appName,
    scale: application.appInstanceCount,
    cpu: '1',
    mem: '1',
    cmd: application.appExec,
    image: application.appImage
  };
  return axios.post(url(params));
}

function scaleApplication(applicationName, instanceCount) {
  const params = {
    name: applicationName,
    scale: instanceCount
  };
  return axios.put(url(params));
}

function getApplicationStatus(applicationName) {
  const params = {
    name: applicationName,
    query: 'status'
  };
  return axios.get(url(params));
}

function deleteAllApplication(applicationName) {
  const params = {
    name: applicationName
  };
  return axios.delete(url(params));
}

module.exports = {
  getAllApplications,
  createApplication,
  scaleApplication,
  getApplicationStatus,
  deleteAllApplication
};
