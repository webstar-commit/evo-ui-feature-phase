const mongoose = require('mongoose');

const userInfosSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  groups: {
    type: [String]
  }
});

const UserInfos = mongoose.model('user_infos', userInfosSchema);

module.exports = UserInfos;
