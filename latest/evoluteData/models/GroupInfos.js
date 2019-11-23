const mongoose = require('mongoose');

const groupInfosSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  groupId: {
    type: String
  },
  groupName: {
    type: String
  },
});

const GroupInfos = mongoose.model('group_infos', groupInfosSchema);

module.exports = GroupInfos;
