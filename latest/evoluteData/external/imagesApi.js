const axios = require('axios');

const baseUrl = 'http://images.evolute.io:5000/v2/';

function getAppImagesList() {
  return axios.get(`${baseUrl}_catalog`);
}

module.exports = {
  getAppImagesList
};
