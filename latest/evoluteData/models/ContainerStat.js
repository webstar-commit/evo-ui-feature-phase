const mongoose = require('mongoose');
const containerStatSchema = require('./schemas/containerStatSchema');
const ContainerStat = mongoose.model('container_stats', containerStatSchema);
module.exports = ContainerStat;
