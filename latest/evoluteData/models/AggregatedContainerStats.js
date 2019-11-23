const mongoose = require('mongoose');

const containerStatsAggregatedSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  value: {
    cpu: Number,
    memory: Number,
    blkioRead: Number,
    blkioWrite: Number,
    networkRx: Number,
    networkTx: Number,
    period: String,
    lxcId: String,
    timeFrom: String
  }
});

// TODO rename collection: container_stats_aggregated -> aggregated_container_stats
const AggregatedContainerStats = mongoose.model('aggregated_container_stats', containerStatsAggregatedSchema, 'aggregated_container_stats');

module.exports = AggregatedContainerStats;
