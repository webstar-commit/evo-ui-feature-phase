const mongoose = require('mongoose');

const serviceInfoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  svcName: {
    type: String
  },
  svcStatus: {
    type: String
  },
  svcOwner: {
    type: String
  },
  svcHealth: {
    type: String
  },
  svcUptime: {
    type: String
  },
  svcApplications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appInfos'
  }]

});

var ServiceInfo = mongoose.model('service_infos', serviceInfoSchema);

module.exports = ServiceInfo;
