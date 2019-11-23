import React from 'react';

import ServiceCard from './ServiceCard.jsx';
import ServiceCardApplications from './ServiceCardApplications.jsx';

export default class ServiceCardGrid extends React.Component {
  _renderCards() {
    return (this.props.items || []).map((item) => <div key={item._id}>

      <ServiceCard card={ item } data={this.props.data}
                    selectedId={ this.props.selectedId }
                    allApplications={ this.props.allApplications }
                    onSelectService={ (id) => { this.props.onSelectService(id) } }
                    onServiceNeedsDeleting={ (service) => { this.props.onServiceNeedsDeleting(service) } } />
      <ServiceCardApplications card={ item } allApplications={ this.props.allApplications }/>
    </div>);
  }

  render() {
    return <section>
      { this._renderCards() }
    </section>;
  }
}
