import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Button from '../common/button/Button.jsx';
import EditInPlace from '../common/edit/EditInPlace.jsx';
import CloseRedButton from '../common/button/CloseRedButton.jsx';

import settings from '../../app.settings.dev';
import { formatUptime,
         capitalizeFirstLetter,
         shortenAppImage,
         trimAppImage,
         validateAppInputFields,
         appNameDynamicValidation,
         instanceCountDynamicValidation } from '../common/utils'

const mockImageUrls = {
  '1': require('../../img/1.png'),
  'ico_red': require('../../img/ico_red.png'),
  'ico_flag': require('../../img/ico_flag.png'),
  'ico_green': require('../../img/ico_green.png')
};

class ApplicationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: null
    };
  }

  render() {
    // TODO render real data
    const card = this.props.card;
    const appId = card._id;
    const responseTime = '12 sec';
    const classes = {
      dirty: !!this.state.dirty
    };
    const appImage = trimAppImage(card.appImage);
    var className = classNames(classes);
    if(this.props.selectedAppId === appId)
      className += ' active';

    return <article className={ className } onClick={ () => { this.props.onSelectApplication(appId) } } >
      <div className="delete-app-btn">
        <CloseRedButton onClick={ () => { this.props.onApplicationNeedsDeleting(card) } } />
      </div>
      <div className="head">
        <img src={ mockImageUrls['1'] } alt=""/>
        <h4><EditInPlace ref="appNameEdit"
                         value={ card.appName }
                         placeholder="Please click here to enter the name"
                         block={ true }
                         error={ this.state.nameError }
                         onChange={ (newValue) => { this.onAppNameChange(newValue) } }/></h4>

        <div className="tags">
          {
            !this.props.newApplication ?
            <div href="#" className="stat">
              <img src={ mockImageUrls['ico_flag'] } width="12" alt=""/>
              <span>{ card.errorCount ? card.errorCount : 0 } ERRORS</span>
            </div> : <div></div>
          }
          <div href="javascript:void(0)" className="stat ins">
            <img src={ mockImageUrls['ico_green'] } width="13" alt=""/>
            <span style={ {'height': 'inherit'} }>
                {
                  <EditInPlace value={ card.instances }
                               decorator={ (value) => ( value ? value : 0 ) + ' INSTANCES' }
                               styles={ {width: '130px', height: '22px'} }
                               overlayButtons={ true }
                               error={ this.state.instanceCountError }
                               onApply={ (value) => { this.onAppInstanceCountChange(value) } }/>
                }
            </span>
          </div>
        </div>
      </div>
      <ul>
        <li><strong>Image</strong>
          {
            <span style={ {width: '115px'} }>
            {
              this.props.newApplication && this.props.newApplication == 'true' ?
              <select className={ this.state.imageError ? "error" : "" }
                      style={ {width: '100%', height: '22px', marginTop: '2px'} }
                      onChange={ (event) => { this.onAppImageChange(event.target.value) } }>
                <option className="label-hide">Select Image</option>
                { this.props.images.map((image) => {
                  return <option className="label-hide" key={image} value={ 'images.evolute.io:5000/' + image }>{ image }</option>
                }) }
              </select> : appImage ? shortenAppImage(appImage) : '-'
            }
            </span>
          }
        </li>
        <li><strong>Exec</strong><span>
          {
            <EditInPlace ref="appExecEdit"
                         value={ this.props.newApplication ? '' : card.appExec }
                         placeholder="Please Add Exec"
                         error={ this.state.execError }
                         onApply={ (value) => { this.onAppExecChange(value) } }/>
          }
        </span></li>
        {
          !this.props.newApplication ?
          <div>
            <li><strong>Uptime</strong><span>{ card.uptime ? formatUptime(card.uptime) : '-' }</span></li>
            <li><strong>Status</strong><span>{ card.status ? capitalizeFirstLetter(card.status) : '-' }</span></li>
          </div> : <p className="error-message">{ this.state.errorMessage }</p>
        }
      </ul>
      {
        (() => {
          if (this.state.dirty) {
            return <div className="card-buttons">
              <Button onClick={ () => { this.onCancelChanges() } }>Cancel</Button>
              <Button onClick={ () => { this.onApplyChanges() } }>Apply changes</Button>
            </div>;
          }
        })()
      }
    </article>;
  }

  onAppNameChange(newAppName) {
    const result = appNameDynamicValidation(newAppName, this.props.existingApplications);
    if(result.error) {
      console.log(result.message);
      this.setState({nameError: true});
    } else {
      this.setState({nameError: false});
    }
    const dirtyData = this.state.dirty;
    const newDirtyData = dirtyData ? _.defaults({appName: newAppName}, dirtyData) : {appName: newAppName};
    this.setState({dirty: newDirtyData});
  }

  onAppInstanceCountChange(newInstanceCount) {
    const result = instanceCountDynamicValidation(newInstanceCount);
    if(result.error) {
      console.log(result.message);
      this.setState({instanceCountError: true});
    } else {
      this.setState({instanceCountError: false});
    }
    const dirtyData = this.state.dirty;
    const newDirtyData = dirtyData ? _.defaults({appInstanceCount: newInstanceCount}, dirtyData) : {appInstanceCount: newInstanceCount};
    this.setState({dirty: newDirtyData});
  }

  onAppImageChange(newAppImage) {
    this.setState({imageError: false});
    const dirtyData = this.state.dirty;
    const newDirtyData = dirtyData ? _.defaults({appImage: newAppImage}, dirtyData) : {appImage: newAppImage};
    this.setState({dirty: newDirtyData});
  }

  onAppExecChange(newAppExec) {
    this.setState({execError: false});
    const dirtyData = this.state.dirty;
    const newDirtyData = dirtyData ? _.defaults({appExec: newAppExec}, dirtyData) : {appExec: newAppExec};
    this.setState({dirty: newDirtyData});
  }

  onCancelChanges() {
    this.refs.appNameEdit.reset();
    // this.refs.appImageEdit.reset();
    // this.refs.appInstancesEdit.reset();
    this.refs.appExecEdit.reset();
    this.setState({dirty: null});
    this.props.onCancelChanges && this.props.onCancelChanges();
  }

  onApplyChanges() {
    const changedApplication = _.defaultsDeep({}, this.state.dirty, { _id: this.props.card._id });
    const result = validateAppInputFields(changedApplication.appName, changedApplication.appExec, changedApplication.appImage, changedApplication.appInstanceCount, this.props.existingApplications);
    if (result.error) {
      if(!result.appName) this.setState({nameError: true});
      if(!result.appExec) this.setState({execError: true});
      if(!result.appImage) this.setState({imageError: true});
      if(result.message == "all") this.setState({errorMessage: "Please fill all the required fields."});
      if(result.message == "existing_name") this.setState({errorMessage: "Please use an unique application name."});
      if(result.message == "not_a_number") this.setState({errorMessage: "Please provide a valid number."});
      if(result.message == "use_of_special_characters") this.setState({errorMessage: "The application name should contain only digits, letters, dashes and underscores"});
    } else {
      console.log('Saving the app', changedApplication);
      this.props.onApplyChanges && this.props.onApplyChanges(changedApplication);
    }
  }
}

export default ApplicationCard;
