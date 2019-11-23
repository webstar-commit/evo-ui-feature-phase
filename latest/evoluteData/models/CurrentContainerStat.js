const mongoose = require('mongoose');
const containerStatSchema = require('./schemas/containerStatSchema');
const CurrentContainerStat = mongoose.model('current_container_stats', containerStatSchema);
module.exports = CurrentContainerStat;
