import React from 'react';

import CustomTable from '../common/table/CustomTable.jsx';
import EditInPlace from '../common/edit/EditInPlace.jsx';
import TableColumn from '../common/table/TableColumn.jsx';
import FirstExtraRow from '../common/table/FirstExtraRow.jsx';
import CustomRow from '../common/table/CustomRow.jsx';
import DetailsExtraRow from '../common/table/DetailsExtraRow.jsx';
import ErrorCount from './ErrorCount.jsx';
import CloseRedButton from '../common/button/CloseRedButton.jsx';

import { formatUptime,
         capitalizeFirstLetter,
         trimAppImage,
         validateAppInputFields,
         appNameDynamicValidation,
         instanceCountDynamicValidation } from '../common/utils';

const imageUrls = {
  'ico_close': require('../../img/ico_close.png')
};

class AddApplicationRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      application: {
        appName: '',
        appExec: '',
        appImage: '',
        appInstanceCount: '',
      }
    };
  }

  render() {
    if (this.props.item) {
      // TODO get image list from API in the future?
      return <td colSpan="7" className="add-clone">
        <form action="#">
          <div className="cols narrow">
            <div className="item">
              <input type="text"
                placeholder="Enter name here..."
                className={ this.state.nameError ? "error-listview" : "" }
                value={ this.state.application.appName }
                onChange={ (evt) => { this.onNameChange(evt) } }/>
            </div>
            <div className="item">
              <select value={ this.state.application.appImage }
                      className={ this.state.imageError ? "error-listview" : "" }
                      onChange={ (evt) => { console.log('test', evt) || this.onImageChange(evt) } }
                      style={ {height: '27px', width: '100%'} }>
                <option className="label-hide">Select Image</option>
                {
                  this.props.images.map((image) => {
                    return <option className="label-hide" key={ image } value={ 'images.evolute.io:5000/' + image }>{ image }</option>
                  })
                }
              </select>
            </div>
            <div className="item">
              <input type="text"
                     placeholder="Enter exec path here..."
                     className={ this.state.execError ? "error-listview" : "" }
                     value={ this.state.application.appExec }
                     onChange={ (evt) => { this.onExecChange(evt) } }/>
            </div>
            <div className="item">
              <input type="text"
                     placeholder="Enter instance number..."
                     className={ this.state.instanceCountError ? "error-listview" : "" }
                     value={ this.state.application.appInstanceCount }
                     onChange={ (evt) => { this.onInstanceCountChange(evt) } }/>
            </div>
            <div className="item">
              <button type="submit" className="btn btn-blue" onClick={ (evt) => {this.onApply(evt)} }>Create</button>
              <a href="javascript:void(0)" className="close"
                 onClick={ () => { this.props.onCancel && this.props.onCancel() } }>
                <img src={ imageUrls['ico_close'] } alt=""/>
              </a>
            </div>
          </div>
        </form>
      </td>;
    } else {
      return null;
    }
  }

  onNameChange(evt) {
    const result = appNameDynamicValidation(evt.target.value, this.props.existingApplications);
    if(result.error) {
      this.setState({nameError: true});
    } else {
      this.setState({nameError: false});
    }
    this.setState({
      application: _.defaults({appName: evt.target.value}, this.state.application)
    });
  }

  onExecChange(evt) {
    this.setState({
      application: _.defaults({appExec: evt.target.value}, this.state.application)
    });
    this.setState({execError: false});
  }

  onImageChange(evt) {
    this.setState({
      application: _.defaults({appImage: evt.target.value}, this.state.application)
    });
    this.setState({imageError: false});
  }

  onInstanceCountChange(evt) {
    const result = instanceCountDynamicValidation(evt.target.value);
    if(result.error) {
      this.setState({instanceCountError: true});
    } else {
      this.setState({instanceCountError: false});
    }
    this.setState({
      application: _.defaults({appInstanceCount: evt.target.value}, this.state.application)
    });
  }


  onApply(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const result = validateAppInputFields(this.state.application.appName, this.state.application.appExec, this.state.application.appImage, this.state.application.appInstanceCount, this.props.existingApplications);
    if (result.error) {
      console.log(result.message);
      if(result.message == 'all' && !result.appName) this.setState({nameError: true});
      if(result.message == 'all' && !result.appExec) this.setState({execError: true});
      if(result.message == 'all' && !result.appImage) this.setState({imageError: true});
      if(result.message == "not_a_number") this.setState({instanceCountError: true});
    } else {
      console.log('Saving the app');
      const appToSave = this.state.application;
      if (!appToSave.appInstanceCount) appToSave.appInstanceCount = 1;
      this.props.onApply && this.props.onApply(appToSave);
    }
  }
}

class ApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationToAdd: null
    };
  }

  reset() {
    this.setState({
      applicationToAdd: null
    });
  }

  render() {
    //const owner = 'Jason Richards';
    const image = 'app-image'; // from the collection
    const exec = '/usr/sbin/application'; // from the collection
    //const instances = 12; // from felicity API
    //const responseTime = '15 sec';
    const status = ''; // Deployed/Undeployed from felicity API (being confirmed now)
    const errorCount = 0; // From Health API, can be green, yellow or green (0, 1, 2)
    const uptime = '2h 30min'; // get from container_stats_current

    // TODO this is EditInPlace to edit instance count. We should decide if we really need it
    // <EditInPlace value={ item.felicity ? item.felicity.instances : 0 } onApply={ () => {} } />

    return <CustomTable ref="table"
                  items={ this.props.items }
                  supportsSelection={ this.props.supportsSelection }
                  selectedAppId={ this.props.selectedAppId }
                  onSelectApplication={ (id) => { this.props.onSelectApplication(id) } }
                  onApplicationNeedsDeleting={ (app) => { props.onApplicationNeedsDeleting(app) } }
                  onSelectionChange={ (items) => { this.props.onSelectionChange(items) } }>
      <TableColumn title="Name" classes="name" getter="appName"/>
      <TableColumn title="Image" classes="image" getter={ (item) => trimAppImage(item.appImage) ? trimAppImage(item.appImage) : '-' }/>
        <TableColumn title="Exec" classes="exec" getter={ (item) => item.appExec ? item.appExec : '-'}/>
      <TableColumn title="Status" classes="status" getter={ (item) => item.status ? capitalizeFirstLetter(item.status) : '-' }/>
      <TableColumn title="Instances" classes="instances"
                   getter={ (item) => item.instances ? item.instances : 0  }/>
      <TableColumn title="Uptime" classes="time" getter={ (item) => item.uptime ? formatUptime(item.uptime) : '-' }/>
      <TableColumn title="Errors"
                   classes="errors"
                   getter={ (item) => <ErrorCount value={ item.errorCount ? item.errorCount : 0 } /> }/>
      <TableColumn getter={ (item) => <div className="delete-app-btn"><CloseRedButton onClick={ () => { this.props.onApplicationNeedsDeleting(item) } }/></div> }/>
      <FirstExtraRow>
        <AddApplicationRow item={ this.state.applicationToAdd }
                           images={ this.props.images }
                           existingApplications={ this.props.items.map((item) => {return item.appName}) }
                           onCancel={ () => { this.reset() } }
                           onApply={ (application) => { this.props.onApplicationNeedsSaving(application) } }/>
      </FirstExtraRow>
    </CustomTable>;
  }

  requestAddApplication() {
    this.setState({applicationToAdd: {}});
  }

  selectedItems() {
    return this.refs.table.selectedItems();
  }
}

ApplicationTable.defaultProps = {
  supportsSelection: false,
  onApplicationNeedsSaving: () => null,
  onSelectionChange: () => null
};

export default ApplicationTable;
