import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

import Panel from './common/panel/Panel.jsx';
import Table from './common/table/Table.jsx';
import TableColumn from './common/table/TableColumn.jsx';
import CpuUtilization from './visualizations/CpuUtilization.jsx';
import MemoryUtilization from './visualizations/MemoryUtilization.jsx';
import Network from './visualizations/Network.jsx';
import Disk from './visualizations/Disk.jsx';
import TrendingUtilization from './visualizations/TrendingUtilization.jsx';

import settings from '../app.settings';

export default class System extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      cpuUtilizationItems: [],
      diskUtilizationItems: [],
      memoryUtilizationItems: []
    };
  }

  _fetchData() {
    $.get(settings.apiBase + '/container_stats/current').then((result) => {
      this.setState({containers: result});
    });
    $.get(settings.apiBase + '/container_stats/current/top5/cpu').then((result) => {
      console.log("/container_stats/current/top5/cpu")
      console.log(result)
      this.setState({cpuUtilizationItems: result});
    });
    $.get(settings.apiBase + '/container_stats/current/top5/disk').then((result) => {
      console.log("/container_stats/current/top5/disk")
      console.log(result)
      this.setState({diskUtilizationItems: result});
    });
    $.get(settings.apiBase + '/container_stats/current/top5/memory').then((result) => {
      console.log("/container_stats/current/top5/memory")
      console.log(result)
      this.setState({memoryUtilizationItems: result});
    });
    $.get(settings.apiBase + '/container_stats/current/top5/network').then((result) => {
      console.log("/container_stats/current/top5/network")
      console.log(result)
      this.setState({networkUtilizationItems: result});
    });
  }

  componentDidMount() {
    this._fetchData();
  }

  render() {
    console.log("this.state.containers")
    console.log(this.state.containers)
    console.log("this.state.cpuUtilizationItems")
    console.log(this.state.cpuUtilizationItems)
    return <div>
      <div className="bg-d v2">
        <div className="container ff">

          <div className="tabs">
            <ul>
              <li className="current"><a href="#top">Top 5</a></li>
              <li><a href="#bot">Bottom 5</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container ff v6">
        <div className="tab-content active" id="top">

          <Table items={ this.state.containers }>
            <TableColumn title="Container name" classes="name"
                         getter={ (item) => item.container.name.substr(1) }/>
            <TableColumn title="Host" getter={ (item) => item.host.node }/>
            <TableColumn title="Host ring" getter={ () => 'HOST_RING_123' }/>
            <TableColumn title="IP Address" getter={ (item) => item.container.ip_address }/>
            <TableColumn title="CPU"
                         getter={ (item) => (Math.round((item.cpu_stats[0].cpu_usage[0].total_usage / item.cpu_stats[0].system_cpu_usage) * 100 * 100) / 100)+'%' }/>
            <TableColumn title="Network" getter={ (item) => `${item.networks.cali0.tx_bytes}b / ${item.networks.cali0.rx_bytes}b`}/>
            <TableColumn title="Memory" getter={
            (item) => {
              const stat = item.memory_stats[0];
              const memUsage = stat.usage;
              const memLimit = stat.limit;
              return (Math.round((memUsage / memLimit) * 100 * 100) / 100) + '%';
            }
          }/>
            <TableColumn title="Disk" getter={ () => 145}/>
          </Table>

          <div className="row row-4">
            <div className="col">

              <Panel title="CPU Utilization">
                <CpuUtilization items={ this.state.cpuUtilizationItems }/>
              </Panel>

            </div>
            <div className="col">

              <Panel title="Memory Utilization">
                <MemoryUtilization items={ this.state.memoryUtilizationItems }/>
              </Panel>

            </div>
            <div className="col">

              <Panel title="Network">
                <Network items={ this.state.networkUtilizationItems}/>
              </Panel>

            </div>
            <div className="col">

              <Panel title="Disk">
                <Disk items={ this.state.diskUtilizationItems } />
              </Panel>

            </div>
          </div>
        </div>

        <div className="tab-content" id="bot">
          <Panel title="Tab2"></Panel>
        </div>

      </div>
    </div>;
  }
}
