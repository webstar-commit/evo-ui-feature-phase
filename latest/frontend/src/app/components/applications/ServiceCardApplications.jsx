import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import ApplicationCard from './ApplicationCard.jsx';

const mockImageUrls = {
  '1': require('../../img/1.png'),
  'ico_flag': require('../../img/ico_flag.png'),
  'ico_green': require('../../img/ico_green.png'),
  'ico_red': require('../../img/ico_red.png')
};

// TODO remove this
const mockCard = () => ({_id: 'id_' + _.uniqueId(), appName: 'test', appStatus: 'Deployed', appUptime: '4h 3min'});

class ServiceCardApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.applications = [];
  }

  componentWillMount() {
    this.applications = _.filter(this.props.allApplications, (application) => _.includes(this.props.card.svcApplications, application._id));
  }

  _toggleActive() {
    this.setState({active: !this.state.active});
  }

  render() {
    const service = this.props.card;
    const serviceName = service.svcName;
    return <div className="gate-apl">
      <h3 className={classNames({active: this.state.active})} onClick={ () => { this._toggleActive() } }>
        {serviceName} Applications
      </h3>

      <div className={classNames({active: this.state.active, inside: true})}>
        <section className="add-application">
          { (this.applications || []).map((item) => {
            return <ApplicationCard key={ item._id } card={ item } />
          }) }
        </section>
      </div>
    </div>;
  }
}

export default ServiceCardApplications;
