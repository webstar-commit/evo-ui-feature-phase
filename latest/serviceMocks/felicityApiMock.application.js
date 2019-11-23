function application(id) {
  return {
    "acceptedResourceRoles": null,
    "args": null,
    "backoffFactor": 1.15,
    "backoffSeconds": 1,
    "cmd": "/sbin/init.sh",
    "constraints": [],
    "container": {
      "docker": {
        "forcePullImage": false,
        "image": "images.evolute.io:5000/evo-cassandra-seed",
        "parameters": [
          {
            "key": "net",
            "value": "evolute"
          },
          {
            "key": "env",
            "value": "CALICO_PROFILE=test"
          },
          {
            "key": "env",
            "value": "CALICO_IP=auto"
          },
          {
            "key": "env",
            "value": "REPO=None"
          }
        ],
        "privileged": true
      },
      "type": "DOCKER",
      "volumes": []
    },
    "cpus": 1,
    "dependencies": [],
    "deployments": [],
    "disk": 0,
    "env": {},
    "executor": "",
    "fetch": [],
    "healthChecks": [],
    "id": '/' + id,
    "instances": 3,
    "ipAddress": null,
    "labels": {},
    "maxLaunchDelaySeconds": 3600,
    "mem": 1,
    "portDefinitions": [
      {
        "labels": {},
        "port": 10001,
        "protocol": "tcp"
      }
    ],
    "ports": [
      10001
    ],
    "readinessChecks": [],
    "requirePorts": false,
    "residency": null,
    "storeUrls": [],
    "tasksHealthy": 0,
    "tasksRunning": 3,
    "tasksStaged": 0,
    "tasksUnhealthy": 0,
    "upgradeStrategy": {
      "maximumOverCapacity": 1,
      "minimumHealthCapacity": 1
    },
    "uris": [],
    "user": null,
    "version": "2016-10-17T20:59:39.219Z",
    "versionInfo": {
      "lastConfigChangeAt": "2016-10-17T17:03:34.000Z",
      "lastScalingAt": "2016-10-17T20:59:39.219Z"
    }
  };
}

module.exports = application;