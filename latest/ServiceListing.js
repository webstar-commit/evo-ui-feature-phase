class FilterableServiceListingBox extends React.Component {
  render() {
    return (
      <ServiceListingList />
    )
  }
}

class ServiceListingList extends React.Component {
  render() {
    return (
      <div className="list-type-r row-list">
        <div className="table services">
          <table>
            <thead>
            <tr>
              <th className="name">Name</th>
              <th className="uptime">UPTIME</th>
              <th className="owner">Owner</th>
              <th className="deployment">Deployment</th>
              <th className="instances">Instances</th>
              <th className="time">RESPONSE TIME</th>
              <th className="errors">ERRORS</th>
            </tr>
            </thead>
          </table>
          <ServiceListingRow />
        </div>
      </div>


    )
  }
}

class ServiceListingRow extends React.Component {
  constructor() {
    super();

    this.state = {
      showServices: false,
      services: []
    };
  }

  componentWillMount() {
    this._fetchServices();
  }

  render() {
    const services_row = this._getServices();
    return (
      <div className="scroll-bar">
        <table>

          {services_row}


        </table>
        <div className="to-clone hide">
          <table>
            <tbody>
            <tr>
              <td className="name down"><span className="arrow"></span>NEW one</td>
              <td className="uptime">12 hours 2 Min</td>
              <td className="owner">Jason Richards</td>
              <td className="deployment">Undeployed</td>
              <td className="instances">12</td>
              <td className="time">12 SEC</td>
              <td className="errors"><img width="11" src="img/ico_flag.png" alt=""/>0</td>
            </tr>
            <tr className="details">
              <td colSpan="7">
                <div className="service-card">
                  <div className="graph">
                    <img src="img/3.png" alt=""/>
                  </div>
                  <div className="stats">
                    <ul>
                      <li className="orange">
                        <strong>2</strong>
                        <img src="img/ico_se_1.png" alt=""/>
                        <span className="text">Database</span>
                      </li>
                      <li className="purple">
                        <strong>10</strong>
                        <img src="img/ico_se_2.png" alt=""/>
                        <span className="text">Web Engine</span>
                      </li>
                      <li className="blue">
                        <strong>12</strong>
                        <img src="img/ico_se_3.png" alt=""/>
                        <span className="text">Applications</span>
                      </li>
                    </ul>
                    <table>
                      <thead>
                      <tr>
                        <th className="th-name">NAME</th>
                        <th className="th-uptime">UPTIME</th>
                        <th className="th-instances">INSTANCES</th>
                        <th className="th-time">RESPONSE TIME</th>
                        <th className="th-type">TYPE</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
  }

  _addSvc(serviceName) {
    const services_row = this._getServices();
    console.log("_addSvc executed");
    console.log("Service Name: " + serviceName);

    let svc = {
      svcName: svcName,
      svcStatus: 'Deployed',
      svcHealth: 'Healthy',
      svcUptime: '12 hours 2 Min'


    };
    console.log("Parsing svc object to send via REST")
    console.log("svcName: " + svc.svcName)
    console.log("svcStatus: " + svc.svcStatus)
    console.log("svcHealth: " + svc.svcHealth)
    console.log("svcUptime: " + svc.svcUptime)

    var myString = JSON.stringify(svc)
    console.log(svc)

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/api/service_infos/apps",
      data: svc,
      dataType: 'json'
    });

    //    this.setState(
    //      //needtofixapps: this.state.applications.concat([apps])
    //
    //    );
    this._fetchServices();
  }


  _fetchServices() {
    $.ajax({
      method: 'GET',
//            url: "http://127.0.0.1:3000/api/service_infos",
      url: "http://127.0.0.1:3000/api/service_infos/apps",
      success: (services) => {
        this.setState({
          services
        })
      }
    });
  }

  _getServices() {
    /*DEBUGconsole.log(this.state.services)*/
    return this.state.services.map((services) => {
      return (<ServiceListingItem key={services._id}
                                  name={services.service_info[0].svcName}
        //                                      applications={services.svcApplications}
                                  applications={services.apps}
                                  uptime={services.service_info[0].svcUptime}
                                  owner={services.service_info[0].svcOwner}
                                  status={services.service_info[0].svcStatus}/>);
    });

  }

  componentWillMount() {
    this._fetchServices();
  }

  componentDidMount() {
    this._timer = setInterval(() => this._fetchServices(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this._timer)
  }


}

class ServiceListingItem extends React.Component {
  render() {

    /*DEBUGconsole.log(this.props.applications);*/
//FAILED        var myString = JSON.stringify(this.props.applications)
//        console.log("parsing this.props.applications");
//        console.log(myString);
//        console.log("removing top array");
//        var newString = myString.slice(0,-1)
//        console.log(newString)
//        var newString2 = newString.slice(1)
//        console.log(newString2);
//        var jsonnewString2 = JSON.parse(newString2);
//        console.log(jsonnewString2);
    console.log("merging array of this.props.applications")
    var merged = [].concat.apply([], this.props.applications);

    console.log(merged)
    return (


      <tbody>


      <tr>
        <td className="name down"><span className="arrow"></span>{this.props.name}</td>
        <td className="uptime">{this.props.uptime}</td>
        <td className="owner">{this.props.owner}</td>
        <td className="deployment">{this.props.status}</td>
        <td className="instances">12</td>
        <td className="time">12 SEC</td>
        <td className="errors"><img width="11" src="img/ico_flag.png" alt=""/>0</td>
      </tr>
      <tr className="details">
        <td colSpan="7">
          <div className="service-card">
            <div className="graph">
              <img src="img/3.png" alt=""/>
            </div>
            <div className="stats">
              <ul>
                <li className="orange">
                  <strong>2</strong>
                  <img src="img/ico_se_1.png" alt=""/>
                  <span className="text">Database</span>
                </li>
                <li className="purple">
                  <strong>10</strong>
                  <img src="img/ico_se_2.png" alt=""/>
                  <span className="text">Web Engine</span>
                </li>
                <li className="blue">
                  <strong>12</strong>
                  <img src="img/ico_se_3.png" alt=""/>
                  <span className="text">Applications</span>
                </li>
              </ul>
              <table>
                <thead>
                <tr>
                  <th className="th-name">NAME</th>
                  <th className="th-uptime">UPTIME</th>
                  <th className="th-instances">INSTANCES</th>
                  <th className="th-time">RESPONSE TIME</th>
                  <th className="th-type">TYPE</th>
                </tr>
                </thead>
                <tbody>
                {merged.map(
                  (SvcApplications) => <ServiceListingItemApplication key={SvcApplications._id}
                                                                      name={SvcApplications.appName}
                                                                      uptime={SvcApplications.appUptime}
                                                                      health={SvcApplications.appHealth}
                                                                      status={SvcApplications.appStatus}/>
                )}
                {/*      <ServiceListingItemApplication SvcApplications={this.props.applications}/>*/}
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
      </tbody>

    );

  }

}


class ServiceListingItemApplication extends React.Component {
  render() {
    { /*DEBUG console.log(this.props.application_list[0].name) */
    }
    return (
      <tr>
        <td className="th-name"><img src="img/ico_se_1.png" alt=""/><a href="#">{this.props.name}</a></td>
        {/*WORKS<td className="th-name"><img src="img/ico_se_1.png" alt="" /><a href="#">{this.props.applications[0].name}</a></td>*/}
        <td className="th-uptime">{this.props.uptime}</td>
        <td className="th-instances">1</td>
        <td className="th-time">12 SEC</td>
        <td className="th-type">Database</td>
      </tr>
    );
  }
}


let services2 = [{
  key: 1,
  name: "CVX_DataLake",
  status: "Undeployed",
  owner: "Jason Bourne",
  health: "Not Applicable",
  uptime: "Not Applicable",
  applications: [{
    key: 1,
    name: "cassandra-seed",
    status: "Undeployed",
    health: "Not Applicable",
    uptime: "Not Applicable"
  }, {
    key: 2,
    name: "cassandra-peer",
    status: "Deployed",
    health: "Healthy",
    uptime: "12 hours 2 Min"
  }, {
    key: 3,
    name: "hadoop-dn",
    status: "Undeployed",
    health: "Not Applicable",
    uptime: "Not Applicable"
  }, {
    key: 4,
    name: "hadoop-nn",
    status: "Deployed",
    health: "Healthy",
    uptime: "12 hours 2 Min"
  }]
}, {
  key: 2,
  name: "AAPL_DataLake",
  status: "Deployed",
  owner: "Steve Wozniak",
  health: "Healthy",
  uptime: "2 Days 12 Hours",
  applications: [{
    key: 1,
    name: "cassandra-seed",
    status: "Undeployed",
    health: "Not Applicable",
    uptime: "Not Applicable"
  }, {
    key: 2,
    name: "cassandra-peer",
    status: "Deployed",
    health: "Healthy",
    uptime: "12 hours 2 Min"
  }, {
    key: 3,
    name: "hadoop-dn",
    status: "Undeployed",
    health: "Not Applicable",
    uptime: "Not Applicable"
  }, {
    key: 4,
    name: "hadoop-nn",
    status: "Deployed",
    health: "Healthy",
    uptime: "12 hours 2 Min"
  }]
}]

var url = "http://127.0.0.1:3000/api/service_infos/apps"
var data = jQuery.ajax({
  url: url,
  async: false,
  dataType: 'json'
}).responseText


console.log("Getting services_info");
console.log(data);

console.log("Parsing services_info root");
var services = jQuery.parseJSON(data);
console.log(services);

console.log("Parsing services_info root -> service_info");
console.log(services[0].service_info);

console.log("Parsing services_info root -> service_info -> svcName");
console.log(services[0].service_info[0].svcName);


ReactDOM.render(
  <FilterableServiceListingBox />,
  document.getElementById('FilterableServiceListingBoxcontainer')
);
