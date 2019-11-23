function applicationDetail(id) {
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
    "id": "/" + id,
    "instances": 3,
    "ipAddress": null,
    "labels": {},
    "lastTaskFailure": {
      "appId": "/" + id,
      "host": "evo115.evolute.io",
      "message": "Docker container run error: Container exited on error: exited with status 137",
      "slaveId": "54f47089-ecfd-405d-b3d3-e35cd5ad3422-S16",
      "state": "TASK_FAILED",
      "taskId": id + ".9e4cfc3e-94ac-11e6-b8d2-026635c332f3",
      "timestamp": "2016-10-17T21:31:36.411Z",
      "version": "2016-10-17T20:59:39.219Z"
    },
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
    "tasks": [
      {
        "appId": "/" + id,
        "host": "evo106.evolute.io",
        "id": id + ".fa2f215d-94ab-11e6-b8d2-026635c332f3",
        "ipAddresses": [
          {
            "ipAddress": "192.168.119.67",
            "protocol": "IPv4"
          }
        ],
        "ports": [
          31845
        ],
        "slaveId": "54f47089-ecfd-405d-b3d3-e35cd5ad3422-S12",
        "stagedAt": "2016-10-17T20:55:03.910Z",
        "startedAt": "2016-10-17T20:55:20.550Z",
        "version": "2016-10-17T20:53:48.540Z"
      },
      {
        "appId": "/" + id,
        "host": "evo105.evolute.io",
        "id": id + ".957b60a1-94ae-11e6-b8d2-026635c332f3",
        "ipAddresses": [
          {
            "ipAddress": "192.168.195.132",
            "protocol": "IPv4"
          }
        ],
        "ports": [
          31234
        ],
        "slaveId": "54f47089-ecfd-405d-b3d3-e35cd5ad3422-S9",
        "stagedAt": "2016-10-17T21:13:43.449Z",
        "startedAt": "2016-10-17T21:13:59.387Z",
        "version": "2016-10-17T20:59:39.219Z"
      },
      {
        "appId": "/" + id,
        "host": "evo104.evolute.io",
        "id": id + ".15a13f02-94b1-11e6-b8d2-026635c332f3",
        "ipAddresses": [
          {
            "ipAddress": "192.168.39.130",
            "protocol": "IPv4"
          }
        ],
        "ports": [
          31850
        ],
        "slaveId": "54f47089-ecfd-405d-b3d3-e35cd5ad3422-S10",
        "stagedAt": "2016-10-17T21:31:37.440Z",
        "startedAt": "2016-10-17T21:31:50.027Z",
        "version": "2016-10-17T20:59:39.219Z"
      }
    ],
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

module.exports = applicationDetail;
