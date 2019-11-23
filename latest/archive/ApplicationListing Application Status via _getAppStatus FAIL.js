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
            apps: [],
            appStatus: [],
        };
    }
    componentWillMount() {
        this._fetchApplications();
    }

    render() {
        const applications_row = this._getApplications();
        return (

            <tbody>
        <CreateApp addApp={this._addApp.bind(this)} images={images}/>        
        
        {applications_row}
				
        </tbody>

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

 _deployApp(applicationName, applicationInstances, applicationImage) {
       
        console.log("_deployApp executed");
        console.log("Application Name: " + applicationName);
     console.log("Application Instances: " + applicationInstances);
        console.log("Application Image: " + applicationImage);
        
//     var applicationName = "test";
     var applicationImage = "images.evolute.io:5000/evo-cassandra-seed";
//     var applicationInstances = 1;
     var applicationCPU = 2;
     var applicationMemory = 1024;
     
        let appRun = {
            appName: applicationName,
           appImage: applicationImage,
            appInstances: applicationInstances,
            appCPU: applicationCPU,
            appMemory: applicationMemory
        };
     
        console.log("Parsing app object to send via REST")
        console.log("appName: " + appRun.appName)
        console.log("appImage: " + appRun.appImage)
        console.log("appInstances: " + appRun.appInstances)
        console.log("appCPU: " + appRun.appCPU)
        console.log("appMemory: " + appRun.appMemory)

        var myString = JSON.stringify(appRun)
        console.log("logging appRun:")
        console.log(appRun)

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:3000/api/container?name=" + appRun.appName + "&scale=" +  appRun.appInstances + "&cpu=" + appRun.appCPU + "&mem=" + appRun.appMemory + "&cmd=/sbin/init.sh" + "&image=" + appRun.appImage,
            data: appRun,
            dataType: 'json'
        });

        //    this.setState(
        //      //needtofixapps: this.state.applications.concat([apps])
        //         
        //    );
    
     
    }

 _getAppStatus(applicationName) {
       
        console.log("_getAppStatus executed");
        console.log("Application Name: " + applicationName);
   
        

//     
//        console.log("Parsing app object to send via REST")
//        console.log("newAppStatus: " + appStatus.appName)
//
//
//        var myString = JSON.stringify(appStatus)
//        console.log("logging appStatus:")
//        console.log(appStatus)

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:3000/api/health/application/" + applicationName, 
                      success: (appStatus) => {
                this.setState({
                    appStatus
                })
            }  
        });

     
    }


    _fetchApplications() {
             console.log("_fetchApplications executed")
        $.ajax({
            method: 'GET',
            url: "http://127.0.0.1:3000/api/app_infos",
            success: (apps) => {
                this.setState({
                    apps
                })
            }
        });
    }

    _getApplications() {
        console.log("_getApplications executed")
        return this.state.apps.map((applications) => {
            return (<ApplicationItem  deployApp={this._deployApp.bind(this)} 
                                   getAppStatus={this._getAppStatus.bind(this)}
                                    key={applications._id}
                                    name={applications.appName}
                                    version={applications.version}
                                    status={applications.appStatus} 
                                    health={applications.appHealth}
                                    uptime={applications.appUptime} />);
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

class ApplicationItem extends React.Component {
    render() {
        return (
                              	<tr>
									<td className="name"><span className="checkbox"><input type="checkbox"></input><label></label></span><a href="#">{this.props.name}</a></td>
									<td className="uptime">{this.props.uptime}</td>
									<td className="owner">Jason Richards</td>
									<td className="deployment">{this.props.status}<a href="#" className="btn btn-blue" onClick={this._handleDeploy.bind(this)}>Deploy</a></td>
									<td className="instances" ref="instances">1</td>
									<td className="time">{this.props.uptime}</td>
									<td className="errors"><img width="11" src="img/ico_flag.png" alt="" /><a href="#" onClick={this._handleAppStatus.bind(this)}> Test</a></td>
								</tr>

      

        );
    }
        _handleDeploy(event) {
        event.preventDefault();

            console.log("_handleDeploy executed");
            console.log("logging references")
            console.log("logging instances " + this.refs.instances.innerHTML)
            console.log("logging app name " + this.props.name)

//        this._appImage.value = 'badentry';
            
            if ((!this.refs.instances.innerHTML) || (!this.props.name)){
            alert('Could not determine name OR number of instances could not be determined');
            return
        }
//
//        console.log("Application Name: " + this._appName.value)
//        console.log("Application Instances: " + this._appInstances.value)
//        console.log("Application Image: " + this._appImage.value)
            
//        this.props.deployApp(this._appName.value, this._appInstances.value, this._appImage.value);

                    this.props.deployApp(this.props.name,this.refs.instances.innerHTML,'/sbin/init.sh');

//        this._appName.value = '';
//        this._appInstances.value = '';
//        this._appImage.value = '';
    }

        _handleAppStatus(event) {
        event.preventDefault();

            console.log("_handleAppStatus executed");
      
            console.log("logging app name " + this.props.name)


            
            if (!this.props.name){
            alert('Could not determine name to retrieve app status for');
            return
        }

                    this.props.getAppStatus(this.props.name);

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
        console.log("Application Exec: " + this._appExec.value)
        this.props.addApp(this._appName.value, this._appExec.value);

        this._appName.value = '';
        this._appExec.value = '';
    }

}

class ApplicationList extends React.Component {
    render() {

        return (
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
            

            <ApplicationRow />
            	
            	</table>

        );
    }

}


class ImageList extends React.Component {
    render() {
        return (
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


let imagesOrig = [{
    key: 1,
    name: "evo-cassandra-seed",
    version: "latest"
}, {
    key: 2,
    name: "evo-cassandra-peer",
    version: "latest"
}]

var url = "images2.json"
var data = jQuery.ajax({
    url: url,
    async: false,
    dataType: 'json'
}).responseText



var parseddata = jQuery.parseJSON(data);


let images = parseddata.images



let applications2 = [{
    key: 1,
    name: "cassandra-seed",
    status: "Undeployed",
    service: "None",
    health: "Not Applicable",
    uptime: "Not Applicable"
}, {
    key: 2,
    name: "cassandra-peer",
    status: "Deployed",
    service: "None",
    health: "Healthy",
    uptime: "12 hours 2 Min"
}, {
    key: 3,
    name: "hadoop-nn",
    status: "Undeployed",
    service: "None",
    health: "Not Applicable",
    uptime: "Not Applicable"
}, {
    key: 4,
    name: "oracle-db12",
    status: "Deployed",
    service: "None",
    health: "Healthy",
    uptime: "12 hours 2 Min"
}, {
    key: 5,
    name: "nginx",
    status: "Undeployed",
    service: "None",
    health: "Not Applicable",
    uptime: "Not Applicable"
}, {
    key: 6,
    name: "evo-rhel",
    status: "Deployed",
    service: "None",
    health: "Healthy",
    uptime: "12 hours 2 Min"
}, {
    key: 7,
    name: "evo-rhel-secure",
    status: "Undeployed",
    service: "None",
    health: "Not Applicable",
    uptime: "Not Applicable"
}]



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


var AppStatusURL = "http://127.0.0.1:3000/api/health/application/evo-cassandra"
var AppStatusData = jQuery.ajax({
            url: AppStatusURL, 
            async: false,
            dataType: 'json'
        }).responseText

console.log("Getting app status");
console.log(AppStatusData);

ReactDOM.render(
    <FilterableApplicationListingBox />,
    document.getElementById('FilterableApplicationListingBoxcontainer')
);