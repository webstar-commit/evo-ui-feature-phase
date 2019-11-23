/**
 * Creates aggregator function for given source and target collections.
 * @param sourceCollection {object} Source MongoDB collection.
 * @param targetCollectionName {string} Target collection name.
 * @returns {Function} aggregator function
 */
const aggregatorFactory = function (sourceCollection, targetCollectionName) {

  function argumentsToMongoQueryConditions(timeFrom, timeTo, lxcId) {
    if (!timeFrom && !timeTo && !lxcId) {
      return undefined;
    }
    let conditions = [];
      timeFrom && (conditions.push({'read': {$gte: timeFrom.toISOString()}}));

    lxcId && (conditions.push({'lxcId': lxcId}));
    return {$and: conditions};
  }

  /**
   * Performs MongoDB map-reduce aggregation for container stats data.
   * @param aggregationPeriod {string} Aggregation period, value can be 'month', 'week', 'day', 'hour', 'minute'
   * @param timeFrom {Date} Start date
   * @param timeTo {Date} Finish date
   * @param lxcId {string} ContainerID
   * @returns {Promise} a promise object for map-reduce operation
   */
  return function (aggregationPeriod, timeFrom, timeTo, lxcId) {
    function map() {
      function getMonday(date) {
        const d = new Date(date);
        const day = d.getDay();
        const difference = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(difference));
      }

      function key(period) {
        function timeSubstringLength() {
          switch (period) {
            case 'month':
              return 7; // 2016-09
            case 'day':
            case 'week':
              return 10; // 2016-09-02
            case 'hour':
              return 13; // 2016-09-02T15
            case 'minute':
              return 16; // 2016-09-02T15:10
            default:
              return 10; // The default is 'day': 2016-09-02
          }
        }

        const preprocessTime = (period === 'week') ? ((time) => getMonday(time.substring(0, timeSubstringLength())).toISOString()) : ((time) => time);
        return (timestamp) => preprocessTime(timestamp).substring(0, timeSubstringLength()) + '_' + aggregationPeriod + '_' + (lxcId ? lxcId : 'all');
      }
        
     function blkioValue(array, operation) {
        return array.filter((item) => (item.major === 253) && (item.minor > 0) && (item.op === operation))
          .map((item) => item.value)
          .reduce((total, x) => total + x, 0);
      }
      emit(key(aggregationPeriod)(this.read), {
        cpu: this.cpu_stats.cpu_usage.total_usage / this.cpu_stats.system_cpu_usage,
        memory: this.memory_stats.usage / this.memory_stats.limit,
        blkioRead: blkioValue(this.blkio_stats.io_serviced_recursive, 'Read'),
        blkioWrite: blkioValue(this.blkio_stats.io_serviced_recursive, 'Write'),
        networkRx: this.networks.cali0.rx_bytes,
        networkTx: this.networks.cali0.tx_bytes
      });
    }


    function reduce(key, values) {
      function mappedAverage(array, mapperCallback) {
        return array.map(mapperCallback).reduce((total, x) => total + x, 0) / array.length;
      }


    return {
        cpu: mappedAverage(values, (item) => item.cpu),
        memory: mappedAverage(values, (item) => item.memory),
        blkioRead: mappedAverage(values, (item) => item.blkioRead),
        blkioWrite: mappedAverage(values, (item) => item.blkioWrite),
        networkRx: mappedAverage(values, (item) => item.networkRx),
        networkTx: mappedAverage(values, (item) => item.networkTx)
      };
    }
      
      

    function finalize(key, reducedValue) {
      reducedValue.period = aggregationPeriod;
      reducedValue.lxcId = lxcId;
      reducedValue.timeFrom = key.substring(0, key.indexOf('_'));
      return reducedValue;
    }

    return sourceCollection.mapReduce(map, reduce, {
      query: argumentsToMongoQueryConditions(timeFrom, timeTo, lxcId),
      out: targetCollectionName ? {merge: targetCollectionName} : {inline: 1},
      scope: {
        aggregationPeriod: aggregationPeriod,
        lxcId: lxcId
      },
      finalize: finalize
    });
  };

};

module.exports = aggregatorFactory;
