//var ExampleApplication = React.createClass({
//    render: function() {
//        var elapsed = Math.round(this.props.elapsed / 100);
//        var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
//        var message =
//            'React has been successfully running for ' + seconds + ' seconds.';
//
//        return <p>{message}</p>;
//    }
//});
//
//var start = new Date().getTime();
//
//setInterval(function() {
//    ReactDOM.render(
//        <ExampleApplication elapsed={new Date().getTime() - start} />,
//        document.getElementById('container')
//    );
//}, 50);

class FilterableServiceCardBox extends React.Component {
  render() {
    return (
      <ServiceCardList />
    )
  }
}

class ServiceCardList extends React.Component {
  render() {
    return (
      <ServiceCardRow />
    )
  }
}

class ServiceCardRow extends React.Component {
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

      <div className="list-type-r cols-list active">

        {services_row}

        <div className="to-clone hide">
          <div className="service-card">
            <div className="left-side">
              <div className="avatar">
                <img src="img/2.png" alt=""/>
              </div>
              <h3>NEW ONE</h3>

              <div className="tags">
                <a href="#" className="stat">
                  <img src="img/ico_red.png" width="15" alt=""/>
                  <span>0 ERRORS</span>
                </a>
                <a href="#" className="stat ins">
                  <img src="img/ico_green.png" width="17" alt=""/>
                  <span>12 INSTANCES</span>
                </a>
              </div>
              <ul>
                <li><strong>DEPLOYMENT</strong><span>Undeployed</span></li>
                <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
                <li><strong>SERVICE</strong><span>None</span></li>
                <li><strong>UPTIME</strong><span>12 hours 2 Min</span></li>
              </ul>
            </div>
            <div className="right-side">
              <div className="stats">
                <ul>
                  <li className="green">
                    <strong>2</strong>
                    <img src="img/ico_s_3.png" alt=""/>
                    <span className="text">Database</span>
                  </li>
                  <li className="grey">
                    <strong>10</strong>
                    <img src="img/ico_s_2.png" alt=""/>
                    <span className="text">Web Engine</span>
                  </li>
                  <li className="blue">
                    <strong>12</strong>
                    <img src="img/ico_s_1.png" alt=""/>
                    <span className="text">Applications</span>
                  </li>
                </ul>
              </div>
              <div className="graph">
                <img src="img/3.png" alt=""/>
              </div>
            </div>
          </div>
          <div className="gate-apl">
            <h3>MDL_Gateway Applications TO CLONE HIDE</h3>

            <div className="inside">
              <section className="add-aplication">
              </section>
            </div>
          </div>
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
      url: "http://127.0.0.1:3000/api/service_infos/apps",
      success: (services) => {
        this.setState({
          services
        })
      }
    });
  }

  _getServices() {
    return this.state.services.map((services) => {
      return (<ServiceCardItem key={services._id}
                               name={services.service_info[0].svcName}
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

class ServiceCardItem extends React.Component {
  render() {
    console.log(this.props.applications);
    /*DEBUGconsole.log("merging array of this.props.applications")*/
    var merged = [].concat.apply([], this.props.applications);
    /*DEBUG console.log(merged)*/
    return (
      <div className="holder">
        <div className="service-card">
          <div className="left-side">
            <div className="avatar">
              <img src="img/2.png" alt=""/>
            </div>
            <h3>{this.props.name}</h3>

            <div className="tags">
              <a href="#" className="stat">
                <img src="img/ico_red.png" width="15" alt=""/>
                <span>0 ERRORS</span>
              </a>
              <a href="#" className="stat ins">
                <img src="img/ico_green.png" width="17" alt=""/>
                <span>12 INSTANCES</span>
              </a>
            </div>
            <ul>
              <li><strong>DEPLOYMENT</strong><span>{this.props.status}</span></li>
              <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
              <li><strong>SERVICE</strong><span>None</span></li>
              <li><strong>UPTIME</strong><span>{this.props.uptime}</span></li>
            </ul>
          </div>
          <div className="right-side">
            <div className="stats">
              <ul>
                <li className="green">
                  <strong>2RIGHT-SIDE</strong>
                  <img src="img/ico_s_3.png" alt=""/>
                  <span className="text">Database</span>
                </li>
                <li className="grey">
                  <strong>10</strong>
                  <img src="img/ico_s_2.png" alt=""/>
                  <span className="text">Web Engine</span>
                </li>
                <li className="blue">
                  <strong>12</strong>
                  <img src="img/ico_s_1.png" alt=""/>
                  <span className="text">Applications</span>
                </li>
              </ul>
            </div>
            <div className="graph">
              <img src="img/3.png" alt=""/>
            </div>
          </div>
        </div>


        <div className="gate-apl">
          <h3 className="active">{this.props.name} Applications</h3>

          <div className="inside active">

            <section className="add-aplication">

              {merged.map(
                (SvcApplications) => <ServiceCardItemApplication key={SvcApplications._id}
                                                                 name={SvcApplications.appName}
                                                                 uptime={SvcApplications.appUptime}
                                                                 health={SvcApplications.appHealth}
                                                                 status={SvcApplications.appStatus}/>
              )}
            </section>

          </div>
        </div>
      </div>

    );
  }
}

class ServiceCardItemApplication extends React.Component {
  render() {
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
              <span>12 INSTANCES</span>
            </a>
          </div>
        </div>
        <ul>
          <li><strong>DEPLOYMENT</strong><span>{this.props.status}</span></li>
          <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
          <li><strong>SERVICE</strong><span>None</span></li>
          <li><strong>UPTIME</strong><span>{this.props.uptime}</span></li>
        </ul>
      </article>
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
  //    },
  //        {key: 2, name: "AAPL_DataLake", status: "Deployed", owner:"Steve Wozniak", health: "Healthy", uptime: "2 Days 12 Hours", applications:[
  //        {key: 1, name: "cassandra-seed", status: "Undeployed",  health: "Not Applicable", uptime: "Not Applicable"},
  //        {key: 2, name: "cassandra-peer", status: "Deployed", health: "Healthy", uptime: "12 hours 2 Min"},
  //        {key: 3, name: "hadoop-dn", status: "Undeployed", health: "Not Applicable", uptime: "Not Applicable"},
  //        {key: 4, name: "hadoop-nn", status: "Deployed", health: "Healthy", uptime: "12 hours 2 Min"}
  //        ]
  //    },
  //     {key: 3, name: "WLG_DataLake", status: "Undeployed", owner:"Brittany Francisco", health: "Not Applicable", uptime: "Not Applicable", applications:[
  //        {key: 1, name: "cassandra-seed", status: "Undeployed",  health: "Not Applicable", uptime: "Not Applicable"},
  //        {key: 2, name: "cassandra-peer", status: "Deployed", health: "Healthy", uptime: "12 hours 2 Min"},
  //        {key: 3, name: "hadoop-dn", status: "Undeployed", health: "Not Applicable", uptime: "Not Applicable"},
  //        {key: 4, name: "hadoop-nn", status: "Deployed", health: "Healthy", uptime: "12 hours 2 Min"}
  //        ]
}]


//
//
//var url = "http://127.0.0.1:3000/api/service_infos/apps"
//var data = jQuery.ajax({
//            url: url, 
//            async: false,
//            dataType: 'json'
//        }).responseText
//
//
//console.log("Getting services_info");
//console.log(data);
//
//var services = jQuery.parseJSON(data);
//
//console.log("Parsing: " + url);
//console.log(services);
//console.log(services[0]);
//console.log(services[0].svcApplications);

//console.log("Trying new applications parse");
//var applications_try = jQuery.parseJSON(data);

//console.log(applications_try);

//console.log("Parsing: local data");
//console.log(services2);
//console.log(services2[0].applications);


//let services = parseddata.images
//console.log(services)

ReactDOM.render(
  <FilterableServiceCardBox />,
  document.getElementById('FilterableServiceCardBoxcontainer')
);
