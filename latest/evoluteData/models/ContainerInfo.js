const mongoose = require('mongoose');
const containerInfoSchema = require('./schemas/containerInfoSchema');
const ContainerInfo = mongoose.model('container_infos', containerInfoSchema);
module.exports = ContainerInfo;
