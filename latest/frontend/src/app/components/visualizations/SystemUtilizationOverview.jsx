import buildVisualization from './SystemUtilizationOverview.d3';

import React from 'react';
import _ from 'lodash';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom';
import ReactDOM from 'react-dom';
import Moment from 'moment';

import settings from '../../app.settings';

const prepareData = (() => {
  const parseTime = d3.time.format("%Y-%m-%dT%H").parse;
  return function (data) {
    var samples = [];
    var summary = data.summary;
    for (var timestamp in data.samples) {
      samples.push({
        time: parseTime(timestamp),
        cpu: data.samples[timestamp].cpu * 100,
        memory: data.samples[timestamp].memory * 100,
        disk: data.samples[timestamp].blkioRead + data.samples[timestamp].blkioWrite,
        network: data.samples[timestamp].networkRx + data.samples[timestamp].networkTx,
        diskR: data.samples[timestamp].blkioRead,
        diskW: data.samples[timestamp].blkioWrite,
        networkR: data.samples[timestamp].networkRx,
        networkW: data.samples[timestamp].networkTx
      });
    }
    samples.sort(function(a, b) {
      return a.time - b.time;
    });
    for (var i = samples.length - 1; i >= 0; i--) {
      summary.cpu = summary.cpu || (samples[i].cpu / 100.0)
      summary.memory = summary.memory || (samples[i].memory / 100.0)
      summary.blkioRead = summary.blkioRead || samples[i].diskR
      summary.blkioWrite = summary.blkioWrite || samples[i].diskW
      summary.networkRx = summary.networkRx || samples[i].networkR
      summary.networkTx = summary.networkTx || samples[i].networkW
    }
    return {
      samples: samples,
      summary: {
        cpu: summary.cpu ? Math.round(summary.cpu * 1000) / 1000 + "%" : '--',
        memory: summary.memory ? Math.round(summary.memory * 1000) / 1000 + "%": '--',
        blkioRead: summary.blkioRead ? Math.round(summary.blkioRead) + "" : '--',
        blkioWrite: summary.blkioWrite ? Math.round(summary.blkioWrite) + "" : '--',
        networkRx: summary.networkRx ? d3.format(".4s")(Math.round(summary.networkRx)) : '--',
        networkTx: summary.networkTx ? d3.format(".4s")(Math.round(summary.networkTx)) : '--',
      }
    };
  }
})();

/**
 * @class SystemUtilizationOverview
 * Renders System Utilization Overview visualization (CPU, Memory, Disk, Network statistics).
 */
export default class SystemUtilizationOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visualization: null
    };
  }

  render() {
    return <div className="system-utilization-overview-visualization">
      { this.state.visualization }
    </div>;
  }

  componentWillMount() {
    var now = new Date();
    var samples = {};
    var summary = {
      cpu: null,
      memory: null,
      blkioRead: null,
      blkioWrite: null,
      networkRx: null,
      networkTx: null
    }
    for (var i = 1; i <= 24; i++) {
      var oneHourAgo = now.setHours(now.getHours() - 1);
      samples[Moment(new Date(oneHourAgo)).format('YYYY-MM-DDTHH')] = {
        cpu: 0,
        memory: 0,
        blkioRead: 0,
        blkioWrite: 0,
        networkRx: 0,
        networkTx: 0
      }
    }
    this.setState({
      visualizationData: {
        samples: samples,
        summary: summary
      }
    });
    this._fetchUtilizationData();
  }

  /**
   * Performs initial D3 diagram building
   */
  componentDidMount() {
    const containerElement = ReactFauxDOM.createElement('section');
    setTimeout(() => {
      this._buildVisualization(containerElement);
    }, 0);
  }

  /**
   * Performs D3 diagram rebuilding each time when component's properties are updated
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const containerElement = ReactFauxDOM.createElement('section');
  setTimeout(() => {
    this._buildVisualization(containerElement);
  }, 0);
  }

  _fetchUtilizationData() {
    $.get(settings.apiBase + '/container_stats/aggregated/get_last_24hr').then((result) => {
      var samples = this.state.visualizationData.samples;
      var summary = this.state.visualizationData.summary;
      for (var i = 0; i < result.length; i++) {
        if (!samples[result[i].value.timeFrom]) {
          samples[result[i].value.timeFrom] = {}
        }
        samples[result[i].value.timeFrom].cpu = result[i].value.cpu;
        samples[result[i].value.timeFrom].memory = result[i].value.memory;
        samples[result[i].value.timeFrom].blkioRead = result[i].value.blkioRead;
        samples[result[i].value.timeFrom].blkioWrite = result[i].value.blkioWrite;
        samples[result[i].value.timeFrom].networkRx = result[i].value.networkRx;
        samples[result[i].value.timeFrom].networkTx = result[i].value.networkTx;
      }
      this.setState({
        visualizationData: {
          samples: samples,
          summary: summary
        }
      });
    }, (error) => {
      console.log("something went wrong");
    });
  }

  _buildVisualization(containerElement) {
    if (this.state.visualizationData) {
      const preparedData = prepareData(this.state.visualizationData);
      const componentDomNode = ReactDOM.findDOMNode(this);
      buildVisualization(d3.select(containerElement), componentDomNode.getBoundingClientRect(), preparedData);
      this.setState({
        visualization: containerElement.toReact()
      });
    } else {
      // We can render loading spinner here if necessary
    }
  }
}
