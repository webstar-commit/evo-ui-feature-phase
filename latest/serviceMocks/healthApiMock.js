const express = require('express');
const app = express();

app.get('/node/:nodeName', function (req, res) {
  res.send([{
    Node: req.params.nodeName,
    CheckID: 'serfHealth',
    Status: Math.random() < 0.8 ? 'passing' : 'warning'
  }, {
    Node: req.params.nodeName,
    CheckID: 'service:something',
    Status: Math.random() < 0.8 ? 'passing' : 'warning'
  }]);
});

app.listen(8500, function () {
  console.log('Mock Health API started.');
});
