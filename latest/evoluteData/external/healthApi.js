const axios = require('axios');

const baseUrl = 'http://health-api.evolute.io:8500';

/**
 * Gets health information for a given container
 * @param containerName
 */
function getContainerHealth(containerName) {
  return axios.get(baseUrl + '/v1/health/node/' + containerName);
}

// Where is network_prefix coming from?
function getMembers() {
  // TODO Would be good add network_prefix here to pass with api call.
  // for now filter post query
  network_prefix = ''
  return axios.get(baseUrl + '/v1/agent/members');
}

module.exports = {
  getContainerHealth,
  getMembers
};
