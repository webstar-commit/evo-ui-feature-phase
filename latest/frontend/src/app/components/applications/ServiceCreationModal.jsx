import React from 'react';
import classNames from 'classnames';

import Button from '../common/button/Button.jsx';

const mockImageUrls = {
  '2': require('../../img/2.png'),
  '3': require('../../img/3.png'),
  'ico_red': require('../../img/ico_red.png'),
  'ico_flag': require('../../img/ico_flag.png'),
  'ico_green': require('../../img/ico_green.png'),
  'ico_s_3': require('../../img/ico_s_3.png'),
  'ico_s_2': require('../../img/ico_s_2.png'),
  'ico_s_1': require('../../img/ico_s_1.png'),
  'ico_close': require('../../img/ico_close.png')
};

const serviceTypeImageUrls = {
  application: mockImageUrls['ico_s_1'],
  webEngine: mockImageUrls['ico_s_2'],
  database: mockImageUrls['ico_s_3']
};

const ApplicationType = (props) => {
  const classes = {crf: true, checked: props.selected};
  return <label className={ classNames(classes) } onClick={ () => { props.onClick && props.onClick() } }>
    <input type="radio" id="crf-input-17" className="crf-i"
           style={ {display: 'none'} }/>
    <img src={ serviceTypeImageUrls[props.type] } alt=""/>
  </label>;
};

const ServiceApplication = (props) => {
  const serviceTypes = ['application', 'webEngine', 'database'];
  return <div className="application">
    <a href="javascript:void(0)"
       className="delete"
       onClick={ () => { props.onDelete() } }><img src={ mockImageUrls['ico_close'] } alt=""/></a>

    <h3>{ props.item.appName }</h3>
    <fieldset>
      <label>Instances</label>
      <input type="number"
             value={ props.item.newInstanceCount || 0 }
             onChange={ (evt) => { props.onNewInstanceCountChange(evt.target.value) } }/>
    </fieldset>
    <fieldset>
      <label>Type</label>

      <div className="radios">
        {
          serviceTypes.map((type) => <ApplicationType key={ `type-${ type }` }
                                                      type={ type }
                                                      selected={ type === props.item.newType }
                                                      onClick={ () => { props.onNewTypeChange(type) } }/>)
        }
      </div>
    </fieldset>
  </div>;
};


class ServiceCreationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {},
      applications: _.clone(props.applications)
    };
  }

  _renderApplications() {
    return this.state.applications.map((application) =>
        <ServiceApplication key={ `application-${application._id}` }
                            item={ application }
                            onDelete={ () => { this.setState({ applications: _.without(this.state.applications, application) }) } }
                            onNewInstanceCountChange={ (newValue) => { this.onNewInstanceCountChange(application, newValue) } }
                            onNewTypeChange={ (newType) => { this.onNewTypeChange(application, newType) } }/>
    );
  }

  render() {
    return <div>
      <form action="#">
        <fieldset>
          <label>Service name</label>
          <input type="text"
                 placeholder="Enter name here..."
                 value={ this.state.service.svcName }
                 onChange={ (evt)=> { this.setState({service: _.defaults({svcName: evt.target.value}, this.state.service)}) } }/>
        </fieldset>

        { this._renderApplications() }

        <div className="bottom">
          <Button type="add" onClick={ () => { console.log('TODO add application') } }>Applications</Button>

          <div className="right">
            <Button type="grey" onClick={ () => { this.props.onCancel && this.props.onCancel() } }>Cancel</Button>
            <Button onClick={ () => { this.onApply() } }>Create</Button>
          </div>
        </div>
      </form>
    </div>;
  }

  onNewInstanceCountChange(applicationBeingChanged, newInstanceCount) {
    if (newInstanceCount < 0) {
      return;
    }
    this.setState({
      applications: _.map(this.state.applications, (application) => {
        if (application === applicationBeingChanged) {
          return _.defaults({newInstanceCount: newInstanceCount}, application);
        } else {
          return application;
        }
      })
    });
  }

  onNewTypeChange(applicationBeingChanged, newType) {
    this.setState({
      applications: _.map(this.state.applications, (application) => {
        if (application === applicationBeingChanged) {
          return _.defaults({newType: newType}, application);
        } else {
          return application;
        }
      })
    });
  }

  onApply() {
    const preparedServiceData = _.defaultsDeep({}, this.state.service, {
      svcApplications: _.map(this.state.applications, (application) => ({
        _id: application._id,
        newInstanceCount: application.newInstanceCount,
        newType: application.newType
      }))
    });
    preparedServiceData.svcOwner = 'G0000001';
    this.props.onApply && this.props.onApply(preparedServiceData);
  }
}

export default ServiceCreationModal;
