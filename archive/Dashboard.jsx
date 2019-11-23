import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

import Button from './common/button/Button.jsx';
import Panel from './common/panel/Panel.jsx';
import Events from './dashboard/Events.jsx';
import DashboardSummary from './dashboard/DashboardSummary.jsx';
import ApplicationOverview from './visualizations/ApplicationOverview.jsx';
import SystemUtilizationOverview from './visualizations/SystemUtilizationOverview.jsx';
import ApplicationAvailability from './visualizations/ApplicationAvailability.jsx';
import ContainerUtilization from './visualizations/ContainerUtilization.jsx';

import settings from '../app.settings';


const imageUrls = {
  g: require('../img/g.png'),
  g1: require('../img/g1.png'),
  g2: require('../img/g2.png'),
  g3: require('../img/g3.png'),
  g4: require('../img/g4.png'),
  g5: require('../img/g5.png'),
  circle: require('../img/circle.png')
};

// TODO replace with real data
const containerUtilizationMockData = () => {
  return _.range(0, 5).map((i) => ({
    _id: _.uniqueId(),
    name: 'Container ' + (i + 1),
    cpu: Math.random() * 100,
    network: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100
  }));
};

// TODO replace with real data
const applicationAvailabilityMockData = () => {
  return _.range(0, 5).map((i) => ({
    _id: _.uniqueId(),
    name: 'Container ' + (i + 1),
    errorCount: Math.random() * 100,
    deviationOfErrors: Math.random() * 100,
    responseTime: Math.random() * 100,
    gaugeValue: Math.random() * 100
  }));
};


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      utilizationData: containerUtilizationMockData(),
      applicationOverview: null,
      systemUtilizationOverview: null
    };
  }

  _fetchUtilizationData() {
    $.ajax({
      type: 'GET',
      url: settings.apiBase + '/stats/aggregated/utilization/top5'
    }).then((result) => {
      this.setState({utilizationData: result});
    });
  }

  _fetchApplicationOverview() {
    $.get(settings.apiBase + '/visualizations/applicationOverview').then((result) => {
      this.setState({applicationOverview: result});
    });
  }

  _fetchSystemUtilizationOverview() {
      console.log("Logging this.state.systemUtilizationOverview in Dashboard _fetchSystemUtilizationOverview")
    console.log(this.state.systemUtilizationOverview)
    $.get(settings.apiBase + '/visualizations/systemUtilizationOverview').then((result) => {
      this.setState({systemUtilizationOverview: result}, function() {
          console.log("Logging State systemUtilizationOverview")
          console.log(this.state.systemUtilizationOverview)
          });
    });
      
  }

  _fetchAvailabilityData() {
    // TODO
  }

  _fetchData() {
    this._fetchUtilizationData();
    this._fetchAvailabilityData();
    this._fetchApplicationOverview();
    this._fetchSystemUtilizationOverview();
  }

  componentDidMount() {
    this._fetchData();
  }

  render() {
    return <div className="container">

      <div id="content">

        <div className="stats-cols">
          <DashboardSummary />
        </div>

        <Panel title="System Utilization Overview"
               headingAside={ <Button type="grey">More Details</Button> }>
          <SystemUtilizationOverview visualizationData={ this.state.systemUtilizationOverview }></SystemUtilizationOverview>

        </Panel>

        <Panel title="Application Overview"
               headingAside={ <Button type="grey">More Details</Button> }>
          <ApplicationOverview visualizationData={ this.state.applicationOverview }/>
        </Panel>

        <div className="row">
          <div className="col">

            <Panel title="Highest Overall Utilization"
                   headingAside={ <Button type="grey">Full List</Button> }>
              <ContainerUtilization items={ containerUtilizationMockData() }/>
            </Panel>

          </div>
          <div className="col">

            <Panel title="Highest Overall Utilization"
                   headingAside={ <Button type="grey">Full List</Button> }>
              <ApplicationAvailability items={ applicationAvailabilityMockData() }/>
            </Panel>

          </div>
        </div>

      </div>

      <aside id="sidebar">
        <Events />
      </aside>
    </div>;
  }
}

