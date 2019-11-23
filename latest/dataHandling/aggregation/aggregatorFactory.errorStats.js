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
    timeFrom && (conditions.push({'time': {$gte: timeFrom.toISOString()}}));
//  timeTo && (conditions.push({'time': {$lte: timeTo.toISOString()}}));
    lxcId && (conditions.push({'lxc_id': lxcId}));
    return {$and: conditions};
  }

  /**
   * Performs MongoDB map-reduce aggregation for error stats data.
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

      emit(key(aggregationPeriod)(this.time), {
        errorCount: this.errorCount,
        deviation: 0
      });
    }

    function reduce(key, values) {
      function mappedAverage(array, mapperCallback) {
        return array.map(mapperCallback).reduce((total, x) => total + x, 0) / array.length;
      }

      const expectation = mappedAverage(values, (item) => item.errorCount);
      const deviation = Math.sqrt(mappedAverage(values.map((item) => {
        const diff = item.errorCount - expectation;
        return diff * diff;
      }), (item) => item));
      return {
        errorCount: expectation,
        deviation: deviation
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
