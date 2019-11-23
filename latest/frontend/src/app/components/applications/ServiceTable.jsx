import React from 'react';

import Button from '../common/button/Button.jsx';
import CloseRedButton from '../common/button/CloseRedButton.jsx';
import EditInPlace from '../common/edit/EditInPlace.jsx';
import Table from '../common/table/Table.jsx';
import TableColumn from '../common/table/TableColumn.jsx';
import DetailsExtraRow from '../common/table/DetailsExtraRow.jsx';
import ErrorCount from './ErrorCount.jsx';

import { formatUptime, determineServiceStatus, determineServiceAvailability, getNumberOfAppsByType } from '../common/utils';

const mockImageUrls = {
  '2': require('../../img/2.png'),
  '3': require('../../img/3.png'),
  'ico_red': require('../../img/ico_red.png'),
  'ico_green': require('../../img/ico_green.png'),
  'ico_flag': require('../../img/ico_flag.png'),
  'ico_s_3': require('../../img/ico_s_3.png'),
  'ico_s_2': require('../../img/ico_s_2.png'),
  'ico_s_1': require('../../img/ico_s_1.png'),
  'ico_se_3': require('../../img/ico_se_3.png'),
  'ico_se_2': require('../../img/ico_se_2.png'),
  'ico_se_1': require('../../img/ico_se_1.png')
};

function mapIconToAppType(appType) {
  switch(appType) {
    case "database":
      return mockImageUrls['ico_se_1'];
    break;
    case "webengine":
      return mockImageUrls['ico_se_2'];
    break;
    case "application":
      return mockImageUrls['ico_se_3'];
    break;
  }
}

const EmbeddedServiceApplicationTable = (props) => {
  return <Table classes="" items={ props.items }>
    <TableColumn title="Name"
                 getter={ (item) => <span><img src={ mapIconToAppType(item.appType) } alt=""/><a href="#">{ item.appName || '-' }</a></span> }/>
    <TableColumn title="Uptime" getter={ (item) => item.uptime ? formatUptime(item.uptime) : '-' }/>
    <TableColumn title="Instances"
                 getter={ (item) => <EditInPlace value={ item.instances || '-' }
                 placeholder="Click to edit"
                 onApply={ (newValue) => { props.onApplicationChange(_.defaults({appInstanceCount: newValue}, item)) } } /> }/>
    <TableColumn title="Type" getter={ (item) => item.appType }/>
  </Table>;
};

const ServiceDetails = (props) => {
  const applications = props.item._applications || _.filter(props.allApplications, (application) => _.includes(props.item.svcApplications, application._id));
  var serviceId = props.item._id;
  const databaseCount = getNumberOfAppsByType(props.allApplications, props.item.svcApplications, 'database');
  const webEngineCount = getNumberOfAppsByType(props.allApplications, props.item.svcApplications, 'webengine');
  const applicationCount = getNumberOfAppsByType(props.allApplications, props.item.svcApplications, 'application');
  var className = 'service-card';
  if(props.selectedId === serviceId)
    className += ' active';

  return <td colSpan="7">
    <div className={className} onClick={ () => { props.onSelectService(serviceId) } }>
      <div className="graph">
        <img src={ mockImageUrls['3'] } alt=""/>
      </div>
      <div className="stats">
        <div className="delete-service-btn">
          <CloseRedButton onClick={ () => { props.onServiceNeedsDeleting(props.item) } } />
        </div>
        <ul>
          <li className="orange">
            <strong>{ databaseCount }</strong>
            <img src={ mockImageUrls['ico_se_1'] } alt=""/>
            <span className="text">Database</span>
          </li>
          <li className="purple">
            <strong>{ webEngineCount }</strong>
            <img src={ mockImageUrls['ico_se_2'] } alt=""/>
            <span className="text">Web Engine</span>
          </li>
          <li className="blue">
            <strong>{ applicationCount }</strong>
            <img src={ mockImageUrls['ico_se_3'] } alt=""/>
            <span className="text">Applications</span>
          </li>
        </ul>
        <EmbeddedServiceApplicationTable items={ applications }
                                         onApplicationChange={ (changedApplication) => { props.onApplicationChange(changedApplication) } }></EmbeddedServiceApplicationTable>
      </div>
      <div className="service-details-bottom">
        {
          (() => ((props.item._isNew || props.item._hasUnsavedChanges) ?
            <Button onClick={ () => { props.onServiceNeedsSaving(props.item) } }>Save</Button> :
            null))()
        }
      </div>
      <div className="clearfix"></div>
    </div>
  </td>;
};

const ServiceTable = (props) => {
  const nameColumnGetter = (item) => <div>
    <EditInPlace value={ item.svcName }
                 placeholder="Input name here"
                 onApply={ (newValue) => { props.onServiceChange(_.defaultsDeep({svcName: newValue}, item)) } }/>
  </div>

  return <Table items={props.items} classes="table services">
    <TableColumn title="Name" classes="name" getter={ item => item.svcName }/>
    {/* <TableColumn title="Name" classes="name" getter={ nameColumnGetter }/> */}
    <TableColumn title="Owner" classes="owner" getter={ (item) => item.ownerName || '-' }/>
    <TableColumn title="Status" classes="deployment" getter={ (item) => determineServiceStatus(props.allApplications, item.svcApplications) || 'Unknown' }/>
    <TableColumn title="Availability" classes="errors" getter={ (item) => <ErrorCount value={ determineServiceAvailability(props.allApplications, item.svcApplications) } /> }/>
    <DetailsExtraRow>
      <ServiceDetails allApplications={props.allApplications}
                      selectedId={ props.selectedId }
                      onSelectService={ (id) => { props.onSelectService(id) } }
                      onApplicationChange={ (application) => { props.onApplicationChange(application) } }
                      onServiceNeedsSaving={ (service) => { props.onServiceNeedsSaving(service) } }
                      onServiceNeedsDeleting={ (service) => { props.onServiceNeedsDeleting(service) } } />
    </DetailsExtraRow>
  </Table>;
};

ServiceTable.defaultProps = {
  onServiceChange: () => null
};

export default ServiceTable;
