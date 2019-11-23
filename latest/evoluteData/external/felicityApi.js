const _ = require('lodash');
const axios = require('axios');

//const baseUrl = 'http://localhost:8001';
//const baseUrl = 'http://52.88.125.22top';


var request = require("request");
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
//body.baseUrl = 'http://192.168.5.129:5000';
body.baseUrl = 'http://felicity.evolute.io:5000';



function paramsToString(params) {
  // TODO escape values as they come from user input
  return _.map(params, (val, key) => key + '=' + val).join('&');
}


function updateBaseURL() {
        body.baseUrl = 'http://52.88.125.22';
        //body.baseUrl = 'http://192.168.5.129:5000';
    }


request("http://felicity.evolute.io", function(error, response, data) {
//request("http://evo1.localdomain:5000", function(error, response, data) {
    body.data = data;
    body.emit('update');
});

body.on('update', function () {
    console.log("logging body.data")
    // console.log(body.data); // HOORAY! THIS WORKS!
    if (!body.data){
        console.log("no body.data")
        updateBaseURL()
    }
    else{
        console.log("we're able to retrieve body.data")
        body.baseUrl = 'http://felicity.evolute.io';
        //body.baseUrl = 'http://evo1.localdomain:5000';
    }

});

function url(params) {
    console.log("logging body baseurl before use")
    console.log(body.baseUrl)
  return _.isEmpty(params) ? body.baseUrl + '/' : body.baseUrl + '/?' + paramsToString(params);
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
  console.log(params);
  return axios.get(url(params));
}

function getApplicationByName(applicationName) {
  const params = {
    name: applicationName
  };
  console.log(params);
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
  deleteAllApplication,
  getApplicationByName
};
