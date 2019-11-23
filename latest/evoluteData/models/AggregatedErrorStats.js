const mongoose = require('mongoose');

const aggregatedErrorStatsSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  value: {
    errorCount: Number,
    deviation: Number,
    period: String,
    lxcId: String,
    timeFrom: String
  }
});

const AggregatedErrorStats = mongoose.model('aggregated_error_stats', aggregatedErrorStatsSchema);

module.exports = AggregatedErrorStats;
