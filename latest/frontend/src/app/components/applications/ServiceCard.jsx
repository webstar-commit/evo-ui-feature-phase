import React from 'react';
import AppsWheel from '../visualizations/AppsWheel.jsx';
import CloseRedButton from '../common/button/CloseRedButton.jsx';
import appsWheelMockData from '../../data/visualizations-appsWheel.js';

import { determineServiceStatus, determineServiceAvailability, determineServiceInstancesNumber, getNumberOfAppsByType } from '../common/utils';

console.log('appsWheelMockData', appsWheelMockData );

const mockImageUrls = {
  '2': require('../../img/2.png'),
  '3': require('../../img/3.png'),
  'ico_red': require('../../img/ico_red.png'),
  'ico_flag': require('../../img/ico_flag.png'),
  'ico_green': require('../../img/ico_green.png'),
  'ico_s_3': require('../../img/ico_s_3.png'),
  'ico_s_2': require('../../img/ico_s_2.png'),
  'ico_s_1': require('../../img/ico_s_1.png')
};

class ServiceCard extends React.Component {
  render() {
    const service = this.props.card;
    const serviceAppsWheelData = this.props.data
    const errorCount = determineServiceAvailability(this.props.allApplications, this.props.card.svcApplications);
    const status = determineServiceStatus(this.props.allApplications, this.props.card.svcApplications);
    const instances = determineServiceInstancesNumber(this.props.allApplications, this.props.card.svcApplications);
    const responseTime = '12 sec';
    const databaseCount = getNumberOfAppsByType(this.props.allApplications, service.svcApplications, 'database');
    const webEngineCount = getNumberOfAppsByType(this.props.allApplications, service.svcApplications, 'webengine');
    const applicationCount = getNumberOfAppsByType(this.props.allApplications, service.svcApplications, 'application');

    var serviceId = service._id;
    var className = 'service-card';
    if(this.props.selectedId === serviceId)
      className += ' active';

    return <div className={className} onClick={ () => { this.props.onSelectService(serviceId) } }>
      <div className="left-side">
        <div className="delete-service-btn">
          <CloseRedButton onClick={ () => { this.props.onServiceNeedsDeleting(service) } } />
        </div>
        <div className="avatar">
          <img src={ mockImageUrls['2'] } alt=""/>
        </div>
        <h3>{ service.svcName }</h3>

        <div className="tags">
          <a href="#" className="stat">
            <img src={ mockImageUrls[errorCount > 0 ? 'ico_red' : 'ico_flag'] } width="15" alt=""/>
            <span>{errorCount} AVAILABILITY</span>
          </a>
          <a href="#" className="stat ins">
            <img src={ mockImageUrls['ico_green'] } width="17" alt=""/>
            <span>{instances} INSTANCES</span>
          </a>
        </div>
        <ul>
          <li><strong>Status</strong><span>{ status ? status : 'Unknown' }</span></li>
          <li><strong>Owner</strong><span>{ service.ownerName || '-' }</span></li>
        </ul>
      </div>
      <div className="right-side">
        <div className="stats">
          <ul>
            <li className="green">
              <strong>{ databaseCount }</strong>
              <img src={ mockImageUrls['ico_s_3'] } alt=""/>
              <span className="text">Database</span>
            </li>
            <li className="grey">
              <strong>{ webEngineCount }</strong>
              <img src={ mockImageUrls['ico_s_2'] } alt=""/>
              <span className="text">Web Engine</span>
            </li>
            <li className="blue">
              <strong>{ applicationCount }</strong>
              <img src={ mockImageUrls['ico_s_1'] } alt=""/>
              <span className="text">Applications</span>
            </li>
          </ul>
        </div>
        <div className="graph">
               <AppsWheel visualizationData={ serviceAppsWheelData }></AppsWheel>
        </div>
      </div>
    </div>;
  }
}

export default ServiceCard;
