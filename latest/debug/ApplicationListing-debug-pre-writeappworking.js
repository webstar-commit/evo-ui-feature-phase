

class FilterableApplicationListingBox extends React.Component {
  render() {
  return (
      
			
					
				<div className="list-type-r row-list">
					<div className="options">
						<p>Select your service applications below:</p>
						<div className="right">
							<span className="selected"><span className="count">0</span> Applications selected</span>
							<a href="#"  className="btn btn-blue">Create</a>
							<a href="#" className="close"><img src="img/ico_close.png" alt="" /></a>
						</div>
					</div>
                 
					<div className="table">

							
				<ApplicationList />
                            
						
					
					</div>
				</div>
		
         
	
   
  )
  }
};

class ApplicationRow extends React.Component {
      constructor() {
    super();

    this.state = {
      showApplications: false,
      apps: []
    };
  }
    
   render() {
    return (
        <tbody>
        <CreateApp addApp={this._addApp.bind(this)} images={images}/>
        
        
        
        {this.props.applications.map(
             (applications) => <ApplicationItem  key={applications._id}
                                    name={applications.appName}
                                    version={applications.version}
                                    status={applications.appStatus} 
                                    health={applications.appHealth}
//                                    service={applications.service}
                                    uptime={applications.appUptime} />
             )}
				
        </tbody>

);
   }
      _addApp(applicationName, applicationExec) {
          console.log("_addApp executed");   console.log("Application Name: " + applicationName);
    console.log("Application Value: " + applicationExec);
    let app = {
    //id created server side     id: mongoose.Types.ObjectId(),
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
    
    this.setState({
      //needtofixapps: this.state.applications.concat([apps])
         
    });
  }
    
  _fetchApplications() {
    $.ajax({
      method: 'GET',
      url: "http://127.0.0.1:3000/api/app_infos",
      success: (apps) => { this.setState({apps})

      }
    }).responseText;
  }
    componentWillMount() {
      this._fetchApplications();
    }
}
class ApplicationItem extends React.Component{
    render(){
        return (
            
                  	<tr>
									<td className="name"><span className="checkbox"><input type="checkbox"></input><label></label></span><a href="#">{this.props.name}</a></td>
									<td className="uptime">{this.props.uptime}</td>
									<td className="owner">Jason Richards</td>
									<td className="deployment">{this.props.status}<a href="#" className="btn btn-blue">Deploy</a></td>
									<td className="instances">12</td>
									<td className="time">{this.props.uptime}</td>
									<td className="errors"><img width="11" src="img/ico_flag.png" alt="" />1 </td>
								</tr>
            
        );
    }
    
}



class CreateApp extends React.Component {
    render() {
        
        return (
        
        				<tr className="add-clone">
									<td colSpan="7">
										<form onSubmit={this._handleSubmit.bind(this)}>
											<div className="cols">
												<div className="item">
													
													
                                                    
                                                        <ImageList images={this.props.images} />
													
												</div>
												<div className="item">
													<input type="text" placeholder="Enter name here..." ref={(input) => this._appName = input} />
												</div>
												<div className="item">
													<input type="text" placeholder="Enter app exec..." ref={(input) => this._appExec = input} />
												</div>
												<div className="item">
													<button type="submit" className="btn btn-blue">Create</button>
													<a href="#" className="close"><img src="img/ico_close.png" alt="" /></a>
            
												</div>
											</div>
									      </form>
            
									</td>
								</tr>
        
        );
    }
_getInstanceCount() {
    this.setState({ 
      characters: this._body.value.length.notdoneyet
    });
  }
    
_handleSubmit(event) {
    event.preventDefault();

    
    if ((!this._appName.value) || (!this._appExec.value)) {
        alert('Please enter your appName and appExec.');
                 return
  }
        
    console.log("Application Name: " + this._appName.value)
    console.log("Application Value: " + this._appExec.value)
    this.props.addApp(this._appName.value, this._appExec.value);
    
    this._appName.value = '';
    this._appExec.value = '';
  }

}

class ApplicationList extends React.Component {
    render() {
        
        return(
            						<table>
							<thead>
								<tr>
									<th className="name"><span className="checkbox"><input type="checkbox"></input><label></label></span>Name</th>
									<th className="uptime">UPTIME</th>
									<th className="owner">Owner</th>
									<th className="deployment">Deployment</th>
									<th className="instances">Instances</th>
									<th className="time">RESPONSE TIME</th>
									<th className="errors">ERRORS</th>
								</tr>
							</thead>
            

            <ApplicationRow applications={apps} />
            	
            	</table>

        );
    }

}


class ImageList extends React.Component{
    render (){
        return(
            <select>
            <option className="label-hide">Select Image</option>
            {this.props.images.map(
             (image) => <ImageItem  key={image.key}
                                    name={image.name}
                                    version={image.version} />
             )}
            </select>       
            );
    }
}


class ImageItem extends React.Component {
    render() {
        return <option>{this.props.name}</option>
        }
}


let imagesOrig= [
    {key: 1, name: "evo-cassandra-seed", version: "latest"},
    {key: 2, name: "evo-cassandra-peer", version: "latest"}
    ]

var url = "images2.json"
var data = jQuery.ajax({
            url: url, 
            async: false,
            dataType: 'json'
        }).responseText


/* DEBUG console.log("Getting images2.json")*/
/* DEBUG console.log(data)*/

var parseddata= jQuery.parseJSON(data);

/* DEBUG console.log("Parsing images2.json")*/
/* DEBUG console.log(parseddata)*/
/* DEBUG console.log(parseddata.images)*/

let images = parseddata.images



let applications2= [
    {key: 1, name: "cassandra-seed", status: "Undeployed", service:"None", health: "Not Applicable", uptime: "Not Applicable"},
    {key: 2, name: "cassandra-peer", status: "Deployed", service:"None", health: "Healthy", uptime: "12 hours 2 Min"},
    {key: 3, name: "hadoop-nn", status: "Undeployed", service:"None", health: "Not Applicable", uptime: "Not Applicable"},
    {key: 4, name: "oracle-db12", status: "Deployed", service:"None", health: "Healthy", uptime: "12 hours 2 Min"},
    {key: 5, name: "nginx", status: "Undeployed", service:"None", health: "Not Applicable", uptime: "Not Applicable"},
    {key: 6, name: "evo-rhel", status: "Deployed", service:"None", health: "Healthy", uptime: "12 hours 2 Min"},
    {key: 7, name: "evo-rhel-secure", status: "Undeployed", service:"None", health: "Not Applicable", uptime: "Not Applicable"}
    ]

/* DEBUG console.log(applications) */


var AppsURL = "http://127.0.0.1:3000/api/app_infos"
var AppsData = jQuery.ajax({
            url: AppsURL, 
            async: false,
            dataType: 'json'
        }).responseText

console.log("Getting app_info");
console.log(AppsData);

var apps = jQuery.parseJSON(AppsData);




ReactDOM.render(
  <FilterableApplicationListingBox />,
  document.getElementById('FilterableApplicationListingBoxcontainer')
);