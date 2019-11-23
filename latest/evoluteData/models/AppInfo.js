const mongoose = require('mongoose');

const appInfoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  appName: {
    type: String
  },
  appExec: {
    type: String
  },
  appType: {
    type: String
  },
  appStatus: {
    type: String
  },
  appOwner: {
    type: String
  },
  appHealth: {
    type: String
  },
  appUptime: {
    type: String
  },
  appImage: {
    type: String
  }
});

const AppInfo = mongoose.model('app_infos', appInfoSchema);

module.exports = AppInfo;
