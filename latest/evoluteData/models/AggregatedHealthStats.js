const mongoose = require('mongoose');

const aggregatedHealthStatsSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  value: {
    health: Number,
    period: String,
    node: String,
    timeFrom: String
  }
});

const AggregatedHealthStats = mongoose.model('aggregated_health_stats', aggregatedHealthStatsSchema);

module.exports = AggregatedHealthStats;
