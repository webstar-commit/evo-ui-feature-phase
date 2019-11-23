const mongoose = require('mongoose');
const containerInfoSchema = require('./schemas/containerInfoSchema');
const CurrentContainerInfo = mongoose.model('current_container_infos', containerInfoSchema);
module.exports = CurrentContainerInfo;
