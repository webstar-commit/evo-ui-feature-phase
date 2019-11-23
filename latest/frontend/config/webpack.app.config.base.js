'use strict';

// Modules
var _ = require('lodash');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function makeWebpackConfig(options) {

  // http://webpack.github.io/docs/configuration.html
  var config = {};

  /**
   * This function gets the current environment
   * @returns {string}
   */
  function getEnvironment() {
    var args = [];
    try {
      var parsedArgv = JSON.parse(process.env.npm_config_argv);
      (parsedArgv && parsedArgv.original) && (args = parsedArgv.original);
    } catch (e) {
      // ignore errors
    }

    // Try to get environment specified explicitly via --environment=<my-environment>
    var explicitEnvironment = _.find(args, function (arg) {
      return _.startsWith(arg, '--environment=');
    });
    if (explicitEnvironment) {
      return explicitEnvironment.substring('--environment='.length);
    }

    function isProduction() {
      return (process.env.npm_lifecycle_script && _.includes(process.env.npm_lifecycle_script, '--production')) ||
        (_.includes(args, '--production'));
    }

    if (isProduction()) {
      return 'production';
    } else if (process.env.JENKINS_URL) {
      return 'ci';
    }
    return 'dev';
  }

  var environment = getEnvironment();
  console.log('Application environment: ' + environment);

  // Application settings are based on environment
  config.resolve = {
    alias: {
      'app.settings.env': './app.settings.' + environment
    }
  };


  // http://webpack.github.io/docs/configuration.html#entry
  if (options.test) {
    config.entry = {}
  } else {
    config.entry = {
      app: './src/app/app.js'
    }
  }

  // http://webpack.github.io/docs/configuration.html#output
  if (options.test) {
    config.output = {}
  } else {
    config.output = {
      path: __dirname + '/../public',
      publicPath: options.build ? './' : 'http://localhost:8080/',
      filename: options.build ? '[name].[hash].js' : '[name].bundle.js',
      chunkFilename: options.build ? '[name].[hash].js' : '[name].bundle.js'
    }
  }

  // http://webpack.github.io/docs/configuration.html#devtool
  if (options.test) {
    config.devtool = 'inline-source-map';
  } else if (options.build) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval';
  }

  config.module = {
    preLoaders: [],
    loaders: [/*{
     test: /\.(js|jsx)$/,
     loaders: ['react-hot', 'babel'],
     exclude: /node_modules/
     }*/{
      test: /\.jsx?$/,         // Match both .js and .jsx files
      exclude: /node_modules/,
      loader: 'babel', // TODO add react-hot
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'file?name=images/[name]-[hash].[ext]'
    }, {
      test: /\.(ico|icon)$/,
      loader: 'file?name=images/[name].[ext]'
    }, {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'file?name=fonts/[name]-[hash].[ext]'
    }, {
      test: /\.(woff|woff2|ttf|eot|svg)\?/,
      loader: 'file?name=fonts/[name]-[hash].[ext]'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.less$/,
      loaders: ["style", "css", "postcss", /*"resolve-url", */"less"]
    }
    ]
  };

  config.plugins = [];

  var cssLoader = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss', 'resolve-url')
  };

  if (options.test) {
    cssLoader.loader = 'null'
  }

  config.module.loaders.push(cssLoader);

  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  config.plugins = [
    new ExtractTextPlugin('[name].[hash].css', {
      disable: !options.build || options.test
    })
  ];

  if (!options.test) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/app/index.html',
        inject: 'body',
        minify: options.build ? {} : false
      })
    )
  }

  if (options.build) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  config.devServer = {
    contentBase: './public',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    },
    headers: {'Access-Control-Allow-Origin': '*'}
  };

  return config;
};

