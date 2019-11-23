import React from 'react';

import ApplicationCard from './ApplicationCard.jsx';

const AddApplicationCard = (props) => <article>
  <a href="javascript:void(0)" className="add" onClick={ () => { props.onClick && props.onClick() } }>ADD
    APPLICATION</a>
</article>;


export default class ApplicationCardGrid extends React.Component {
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

  _renderCards() {
    return (this.props.items || [])
      .map((item) => <ApplicationCard key={item._id}
                                      card={ item }
                                      selectedAppId={ this.props.selectedAppId }
                                      onSelectApplication={ (id) => { this.props.onSelectApplication(id) } }
                                      onApplicationNeedsDeleting={(application) => { this.props.onApplicationNeedsDeleting(application) }}
                                      onApplyChanges={(application) => { this.onApplicationNeedsSaving(application) }}/>);
  }

  render() {
    return <section className="add-application">
      {
        (() => this.state.applicationToAdd ?
          <ApplicationCard key="applicationToAdd"
                           card={ this.state.applicationToAdd }
                           selectedAppId={ this.props.selectedAppId }
                           images={ this.props.images }
                           existingApplications={ this.props.items.map((item) => {return item.appName}) }
                           newApplication="true"
                           onSelectApplication={ (id) => { this.props.onSelectApplication(id) } }
                           onApplicationNeedsDeleting={(application) => { this.props.onApplicationNeedsDeleting(application) }}
                           onApplyChanges={(application) => { this.onApplicationNeedsSaving(application) }}
                           onCancelChanges={ () => { this.reset() } }/> :
          <AddApplicationCard onClick={ () => { this.onAddApplication() } }/>)()
      }

      { this._renderCards() }
    </section>;
  }

  onAddApplication() {
    this.requestAddApplication();
  }

  requestAddApplication() {
    this.setState({applicationToAdd: {}});
  }

  onApplicationNeedsSaving(application) {
    this.props.onApplicationNeedsSaving && this.props.onApplicationNeedsSaving(application);
  }

  onApplicationChange(application) {
    this.props.onApplicationChange && this.props.onApplicationChange(application);
  }

}
