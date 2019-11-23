const mongoose = require('mongoose');

const healthStatsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  lxcId: {
    type: String
  },
  containerName: {
    type: String
  },
  time: {
    type: Date
  },
  status1: {
    type: String
  },
  status2: {
    type: String
  },
  health: {
    type: Number
  },
});

const HealthStats = mongoose.model('health_stats', healthStatsSchema);

module.exports = HealthStats;
