import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

import Panel from './common/panel/Panel.jsx';
import Table from './common/table/Table.jsx';
import TableColumn from './common/table/TableColumn.jsx';
import ViewTypeSelector from './common/viewType/ViewTypeSelector.jsx';
import SimpleTabs from './common/tabs/SimpleTabs.jsx';
import EditInPlace from './common/edit/EditInPlace.jsx';

import ApplicationSelectionSummary from './applications/ApplicationSelectionSummary.jsx';
import ApplicationCard from './applications/ApplicationCard.jsx';
import ApplicationCardGrid from './applications/ApplicationCardGrid.jsx';
import ApplicationTable from './applications/ApplicationTable.jsx';
import ServiceCard from './applications/ServiceCard.jsx';
import ServiceCardGrid from './applications/ServiceCardGrid.jsx';
import ServiceTable from './applications/ServiceTable.jsx';
import ServiceCardApplications from './applications/ServiceCardApplications.jsx';
import ServiceCreationPanel from './applications/ServiceCreationPanel.jsx';

import settings from '../app.settings';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'applications',
      currentViewType: 'cards',
      isApplicationSelectionInProgress: false,
      applications: [],
      services: [],
      applicationOverview: null,
      serviceAppsWheel: null
    };
  }

  _fetchApplications() {
    $.get(settings.apiBase + '/app_infos').then((result) => {
      this.setState({applications: result});
    });
  }

  _fetchServices() {
    $.get(settings.apiBase + '/service_infos').then((result) => {
      this.setState({services: result});
    });
  }


  _fetchData() {
    this._fetchApplications();
    this._fetchServices();
    this._fetchServiceAppsWheel();
  }

  componentDidMount() {
    this._fetchData();
  }

  currentTab() {
    return this.state.currentTab;
  }

  _setCurrentTab(tabValue) {
    this.setState({currentTab: tabValue});
  }

  currentViewType() {
    return this.state.currentViewType;
  }

  _setCurrentViewType(viewType) {
    this.setState({currentViewType: viewType});
  }


  _applications() {
    return this.state.applications || [];
  }

  _services() {
    return this.state.services || [];
  }

  _renderServiceCards() {
    return <div className="cols-list">
      <ServiceCardGrid items={ this._services() } data={this.state.serviceAppsWheel}/>
    </div>;
  }

  _renderServiceRows() {
    return <div className="row-list">
      <ServiceTable items={ this._services() }
                    allApplications={ this._applications() }
                    onServiceNeedsSaving={ (service) => { this.saveService(service) } }
                    onServiceChange={ (changedService) => { this.onServiceChange(changedService) } }
                    onApplicationChange={ (changedApplication) => { this.onApplicationChange(changedApplication) } }/>
    </div>;
  }

  _renderServices() {
    return <div id="services">
      {
        (() => {
          if (this.currentViewType() === 'cards') {
            return this._renderServiceCards();
          } else if (this.currentViewType() === 'rows') {
            return this._renderServiceRows();
          }
        })()
      }
    </div>;
  }


  /*
   <td className="deployment">Undeployed <a href="#" className="btn btn-blue">Deploy</a></td>
   */

  _renderApplicationCards() {
    return <div className="cols-list">
      <ApplicationCardGrid ref="applicationCardGrid"
                           items={ this._applications() }
                           onAddApplication={ () => { this.onAddApplication() } }
                           onApplicationNeedsSaving={ (application) => { this.saveApplication(application) } }/>
    </div>;
  }

  _renderApplicationRows() {
    return <div className="row-list">
      <ApplicationTable ref="applicationTable"
                        items={ this._applications() }
                        onApplicationNeedsSaving={ (application) => { this.saveApplication(application) } }/>
    </div>;
  }

  _renderApplications() {
    return <div id="appls">
      {
        (() => {
          if (this.currentViewType() === 'cards') {
            return this._renderApplicationCards();
          } else if (this.currentViewType() === 'rows') {
            return this._renderApplicationRows();
          }
        })()
      }
    </div>;
  }
    
    
      _fetchServiceAppsWheel() {
    $.get(settings.apiBase + '/visualizations/serviceAppsWheel').then((result) => {
      this.setState({serviceAppsWheel: result}, function() {
          console.log("Logging State serviceAppsWheel")
          console.log(this.state.serviceAppsWheel)
          });
    });
      
  }
  render() {
    return <div>
      <div className="bg-d">
        <div className="container ff">
          <div className="main-title">
            <h2>Applications</h2>
            <ViewTypeSelector currentViewType={ this.currentViewType() }
                              onViewTypeClicked={(viewType) => { this._setCurrentViewType(viewType) }}/>
          </div>

          <SimpleTabs items={ ['Applications', 'Services'] }
                      onItemClicked={ (tab) => { this._setCurrentTab(tab) } }
                      currentValue={ this.currentTab() }>
            <a href="javascript:void(0)" className="btn btn-grey filter">Filter</a>
            <a href="javascript:void(0)" className="btn btn-add btn-add-app"
               onClick={ () => {this.onAddApplication()} }>Add Application</a>
            <a href="javascript:void(0)" className="btn btn-add btn-add-serv" onClick={ () => {this.onAddService()} }>Add
              Service</a>
          </SimpleTabs>

        </div>
      </div>

      <div className="container ff">
        {
          (() => {
            if (this.state.isApplicationSelectionInProgress) {
              return <ServiceCreationPanel applications={ this._applications() }
                                           onCancel={() => { this.onCancelServiceCreation() } }
                                           onApply={ (preparedServiceData) => { this.saveService(preparedServiceData) } }/>;
            } else if (this.currentTab() === 'applications') {
              return this._renderApplications();
            } else if (this.currentTab() === 'services') {
              return this._renderServices();
            }
          })()
        }
      </div>

    </div>;
  }

  onAddApplication() {
    this.refs.applicationCardGrid && this.refs.applicationCardGrid.requestAddApplication();
    this.refs.applicationTable && this.refs.applicationTable.requestAddApplication();
  }

  onAddService() {
    this.setState({isApplicationSelectionInProgress: true});
    //modalUtil.showModal(<AddServiceModal/>, {title: 'Service'});
  }

  onCancelServiceCreation() {
    this.setState({isApplicationSelectionInProgress: false});
  }

  // TODO remove this
  /*onContinueServiceCreation(selectedApplications) {
   let newState = {
   isApplicationSelectionInProgress: false,
   currentTab: 'services',
   currentViewType: 'rows',
   services: _.clone(this.state.services)
   };
   newState.services.unshift({
   _isNew: true,
   svcName: '',
   _applications: selectedApplications
   });
   this.setState(newState);

   }*/

  onServiceChange(changedService) {
    console.log('onServiceChange', changedService);
    changedService._hasUnsavedChanges = true;
    this.setState({
      services: _.map(this.state.services, (service) => service._id === changedService._id ? changedService : service)
    });
  }

  onApplicationChange(changedApplication) {
    console.log('onApplicationChange', changedApplication);
    // TODO handle this event
    /*this.setState({
     applications
     });*/
  }

  saveApplication(application) {
    application._isNew && (delete application._id);
    delete application._isNew;
    delete application._hasUnsavedChanges;
    console.log('saveApplication application = ', application);
    $.ajax({
      type: application._id ? 'PATCH' : 'POST',
      url: settings.apiBase + '/app_infos',
      data: JSON.stringify(application),
      contentType: 'application/json',
      dataType: 'json'
    });

    // TODO move this into 'then' promise section
    this._fetchApplications();
    this.refs.applicationCardGrid && this.refs.applicationCardGrid.reset();
    this.refs.applicationTable && this.refs.applicationTable.reset();
  }

  saveService(service) {
    /*service.svcApplications = _.map(service._applications, (application) => ({
     _id: application._id,
     appInstanceCount: application.appInstanceCount
     }));*/
    service._isNew && (delete service._id);
    delete service._applications;
    delete service._isNew;
    delete service._hasUnsavedChanges;
    console.log('saveService service = ', service);
    $.ajax({
      type: service._id ? 'PATCH' : 'POST',
      url: settings.apiBase + '/service_infos',
      data: JSON.stringify(service),
      dataType: 'json',
      contentType: 'application/json'
    }).then(() => {
      this._fetchServices();
    });
    this.setState({isApplicationSelectionInProgress: false});
  }
}

