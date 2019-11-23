const mongoose = require('mongoose');

const aggregatedNetworkStatsSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  value: {
    averageResponseTime: Number,
    period: String,
    node: String,
    timeFrom: String
  }
});

const AggregatedNetworkStats = mongoose.model('aggregated_network_stats', aggregatedNetworkStatsSchema);

module.exports = AggregatedNetworkStats;

