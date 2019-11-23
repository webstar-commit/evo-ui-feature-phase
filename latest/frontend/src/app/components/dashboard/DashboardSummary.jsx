import React, { Component } from 'react';

import settings from '../../app.settings';

export default class DashboardSummary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { };
    }

    _fetchApplications() {
      $.get(settings.apiBase + '/app_infos/count').then((result) => {
        this.setState({numApplications: result["count"]});
      });
    }

    _fetchServices() {
      $.get(settings.apiBase + '/service_infos/count/Deployed').then((result) => {
        this.setState({numServices: result["count"]});
      });
    }

    _fetchHostRings() {
      $.get(settings.apiBase + '/hostRing_infos/count').then((result) => {
        this.setState({numHostRings: result["count"]});
      }, (error) => {
        this.setState({numHostRings: 0});
      });
    }

    _fetchHosts() {
      $.get(settings.apiBase + '/dashboard/host_count').then((result) => {
        this.setState({numHosts: result["count"]});
      }, (error) => {
        this.setState({numHosts: 0});
      });;
    }

    _fetchImages() {
      $.get(settings.apiBase + '/dashboard/images_count').then((result) => {
        this.setState({numImages: result["count"]});
      }, (error) => {
        this.setState({numImages: 0});
      });;
    }

    _fetchData() {
      this._fetchServices();
      this._fetchApplications();
      this._fetchHosts();
      this._fetchHostRings();
      this._fetchImages();
    }

    componentDidMount() {
      this._fetchData();
    }

  render() {
    return (
      <section>
        <article>
          <h4>Running Applications</h4>

          <p>{this.state.numApplications}</p>
        </article>
        <article>
          <h4>Running Images</h4>

          <p>{this.state.numImages}</p>
        </article>
        <article>
          <h4>Running Services</h4>

          <p>{this.state.numServices}</p>
        </article>
        <article>
          <h4>Running Hosts</h4>

          <p>{this.state.numHosts}</p>
        </article>
        <article>
          <h4>Running Host Rings</h4>

          <p>{this.state.numHostRings}</p>
        </article>
      </section>
    );
  }

}
