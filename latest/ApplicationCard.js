class FilterableApplicationCardBox extends React.Component {
  render() {
    return (
      <ApplicationCardList />
    );
  }
}


class ApplicationCardRow extends React.Component {
  constructor() {
    super();

    this.state = {
      showApplications: false,
      apps: []
    };
  }

  componentWillMount() {
    this._fetchApplications();
  }

  render() {
    const applications_row = this._getApplications();
    return (
      <section className="add-aplication">

        <CreateAppCard />

        {applications_row}

      </section>
    );
  }

  _addApp(applicationName, applicationExec) {
    const applications_row = this._getApplications();
    console.log("_addApp executed");
    console.log("Application Name: " + applicationName);
    console.log("Application Value: " + applicationExec);
    let app = {
      appName: applicationName,
      appStatus: 'Deployed',
      appHealth: 'Healthy',
      appUptime: '12 hours 2 Min',
      appExec: applicationExec


    };
    console.log("Parsing app object to send via REST")
    console.log("appName: " + app.appName)
    console.log("appExec: " + app.appExec)
    console.log("appStatus: " + app.appStatus)
    console.log("appHealth: " + app.appHealth)
    console.log("appUptime: " + app.appUptime)

    var myString = JSON.stringify(app)
    console.log(app)

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/api/app_infos",
      data: app,
      dataType: 'json'
    });

//    this.setState(
//      //needtofixapps: this.state.applications.concat([apps])
//         
//    );
    this._fetchApplications();
  }

  _fetchApplications() {
    $.ajax({
      method: 'GET',
      url: "http://127.0.0.1:3000/api/app_infos",
      success: (apps) => {
        this.setState({apps})
      }
    });
  }

  _getApplications() {
    return this.state.apps.map((applications) => {
      return (<ApplicationCardItem key={applications._id}
                                   name={applications.appName}
                                   version={applications.version}
                                   status={applications.appStatus}
                                   health={applications.appHealth}
                                   uptime={applications.appUptime}/>);
    });

  }

  componentWillMount() {
    this._fetchApplications();
  }

  componentDidMount() {
    this._timer = setInterval(() => this._fetchApplications(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this._timer)
  }

}

class ApplicationCardItem extends React.Component {
  constructor() {
    super();

    this.state = {
// WORKS            appCount: [{ id: 1, name:"evo-cassandra-seed", count: 4}]
      appCount: []

    };
  }

  render() {
    const InstanceCount = this._getInstanceCount(this.props.name)
//        const InstanceCount = this._getInstanceCount("evo-cassandra-seed")
    console.log("logging InstanceCount")
    console.log(InstanceCount)
    console.log("logging state of appCount")
    console.log(this.state.appCount)
    return (

      <article>
        <div className="head">
          <img src="img/1.png" alt=""/>
          <h4><a href="#">{this.props.name}</a></h4>

          <div className="tags">

            <a href="#" className="stat">
              <img src="img/ico_flag.png" width="10" alt=""/>
              <span>0 ERRORS</span>
            </a>
            <a href="#" className="stat ins">
              <img src="img/ico_green.png" width="13" alt=""/>
              <span>{this.state.appCount} INSTANCES</span>
            </a>
          </div>
        </div>
        <ul>
          <li><strong>DEPLOYMENT</strong><span>{this.props.status}</span></li>
          <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
          <li><strong>SERVICE</strong><span>{this.props.service}</span></li>
          <li><strong>UPTIME</strong><span>{this.props.uptime}</span></li>
        </ul>
      </article>

    );
  }

  _getInstanceCount(appId) {
    console.log("_getInstanceCount executed")
    $.ajax({
      method: 'GET',
      url: "http://127.0.0.1:3000/api/application/" + appId + "/count",
      success: (appCount) => {
        this.setState({
          appCount
        })
      }
    });
    console.log("logging appCount")
    console.log(this.state.appCount)
    return this.state.appCount;
  }

}


class CreateAppCard extends React.Component {
  render() {

    return (

      <article>
        <a href="#" className="add">ADD APPLICATION2</a>
      </article>

    );
  }

}

class ApplicationCardList extends React.Component {
  render() {
    return (
      <div className="list-type-r cols-list active">

        <ApplicationCardRow />

      </div>

    );
  }
}


let applications2 = [
  {
    key: 1,
    name: "cassandra-seed",
    status: "Undeployed",
    service: "None",
    health: "Not Applicable",
    uptime: "Not Applicable"
  },
  {key: 2, name: "cassandra-peer", status: "Deployed", service: "None", health: "Healthy", uptime: "12 hours 2 Min"},
  {
    key: 3,
    name: "hadoop-nn",
    status: "Undeployed",
    service: "None",
    health: "Not Applicable",
    uptime: "Not Applicable"
  },
  {key: 4, name: "oracle-db12", status: "Deployed", service: "None", health: "Healthy", uptime: "12 hours 2 Min"},
  {key: 5, name: "nginx", status: "Undeployed", service: "None", health: "Not Applicable", uptime: "Not Applicable"},
  {key: 6, name: "evo-rhel", status: "Deployed", service: "None", health: "Healthy", uptime: "12 hours 2 Min"},
  {
    key: 7,
    name: "evo-rhel-secure",
    status: "Undeployed",
    service: "None",
    health: "Not Applicable",
    uptime: "Not Applicable"
  }
]

/* DEBUG console.log(applications) */

//
//var AppsURL = "http://127.0.0.1:3000/api/app_infos"
//var AppsData = jQuery.ajax({
//            url: AppsURL, 
//            async: false,
//            dataType: 'json'
//        }).responseText
//
//console.log("Getting app_info");
//console.log(AppsData);
//
//var apps = jQuery.parseJSON(AppsData);


ReactDOM.render(
  <FilterableApplicationCardBox />,
  document.getElementById('FilterableApplicationCardBoxcontainer')
);


