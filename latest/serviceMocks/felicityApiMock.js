const express = require('express');
const app = express();

const application = require('./felicityApiMock.application');
const applicationDetail = require('./felicityApiMock.applicationDetail');

let applications = [
  application('test-web-app'),
  application('test-database'),
  application('test-reporting')
];

/**
 * Get the applications or specific application information
 * http -v -f GET  felicity.evolute.io
 * http -v -f GET  felicity.evolute.io  name==test1
 * http -v -f GET  felicity.evolute.io  name==test1 query==instances
 * http -v -f GET  felicity.evolute.io  name==test1 query==status
 */
app.get('/', function (req, res) {
  if (req.query.query === 'instances') {
    res.send('3');
  } else if (req.query.query === 'status') {
    res.send('deployed');
  } else if (req.query.name) {
    res.send({
      app: applicationDetail(req.query.name)
    });
  } else {
    res.send({
      apps: applications
    });
  }
});

/**
 * Creates an application
 * http -v -f POST felicity.evolute.io name=='test1' scale=='1' cpu=='1' mem=='1'  cmd=='/sbin/init.sh' image=='images.evolute.io:5000/evo-cassandra-seed'
 */
app.post('/', function (req, res) {
  if (req.query.name) {
    const applicationName = req.query.name;
    applications.push(application(applicationName));
    console.log(`Application created: ${applicationName}`);
  }
});

/**
 * Scales the application
 * http -v -f PUT  felicity.evolute.io name==test1 scale==2
 */
app.put('/', function(req, res) {
  if (req.query.name && req.query.scale) {
    console.log(`Application ${req.query.name} scaled to ${req.query.scale} instances.`);
  }
});

app.listen(8500, function () {
  console.log('Mock Felicity API started.');
});
