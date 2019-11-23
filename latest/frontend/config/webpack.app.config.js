var _ = require('lodash');
var configurationBase = require('./webpack.app.config.base');

module.exports = function (options) {
  var defaultOptions = {
    proxyApiTarget: 'http://localhost:3000'
  };
  var o = _.defaultsDeep(options, defaultOptions);
  var webpackConfiguration = configurationBase(o);
  console.log('Configuration = ', webpackConfiguration);
  return webpackConfiguration;
};

