import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory, hashHistory } from 'react-router';

import $ from 'jquery';
window.$ = $;

import settings from './app.settings';
console.log('Frontend settings', settings);

//require('../../node_modules/reset-css/reset.css');

require('./styles/fonts.css');
require('./styles/style.css');
require('./styles/style-applicationOverview.css');
require('./styles/style-appsWheel.css');
require('./styles/style-systemUtilizationOverview.css');


import Main from './components/Main.jsx';
import Dashboard from './components/Dashboard.jsx';
import System from './components/System.jsx';
import Application from './components/Application.jsx';


render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Dashboard} />
      <Route path="/system" component={System}/>
      <Route path="/application" component={Application}/>
    </Route>
  </Router>, document.getElementById('root'));

