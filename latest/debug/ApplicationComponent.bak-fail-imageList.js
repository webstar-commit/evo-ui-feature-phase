var ExampleApplication = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message =
      'React has been successfully running for ' + seconds + ' seconds.';

    return <p>{message}</p>;
  }
});

var start = new Date().getTime();

setInterval(function() {
  ReactDOM.render(
    <ExampleApplication elapsed={new Date().getTime() - start} />,
    document.getElementById('container')
  );
}, 50);

class FilterableApplicationBox extends React.Component {
  render() {
  return (
      
			<div className="tab-content active" id="appls">
					
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
		</div>
         
	
   
  )
  }
};

class ApplicationRow extends React.Component {
   render() {
    return (

        	<tr>
									<td className="name"><span className="checkbox"><input type="checkbox"></input><label></label></span><a href="#">hadoop-nn</a></td>
									<td className="uptime">12 hours 2 Min</td>
									<td className="owner">Jason Richards</td>
									<td className="deployment">Undeployed <a href="#" className="btn btn-blue">Deploy</a></td>
									<td className="instances">12</td>
									<td className="time">12 SEC</td>
									<td className="errors"><img width="11" src="img/ico_flag.png" alt="" />1 </td>
								</tr>
);
   }
}




class TryApp extends React.Component {
    render() {
        
        return (
        

            
        				<tr className="add-clone">
									<td colSpan="7">
										<form action="#">
											<div className="cols">
												<div className="item">
													<select>
														<option className="label-hide">Select Image</option>
                                                        <option className="label-hide">{this.props.image}</option>
                                                        
													</select>
												</div>
												<div className="item">
													<input type="text" placeholder="Enter name here..."></input>
												</div>
												<div className="item">
													<input type="text" placeholder="Enter owner here..."></input>
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

}

class ApplicationList extends React.Component {
    render() {
        const test2 = this._getImages();
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
            <tbody>

         <TryApp image={test2}/>
            <ApplicationRow />
            	</tbody>
            	</table>
        );
    }
         _getImages(){
            const imageList = [
    { id:1, name:'evo-nginx', tag:'latest' },
    { id:2, name:'evo-nginx-proxy', tag:'latest' },
    { id:3, name:'evo-cassandra-seed', tag:'latest' }
            ];
             
         return imageList.map((image) => {
             return <TryApp image={image.name} key={image.id} />
             
             
         });
     }
}


    
ReactDOM.render(
  <FilterableApplicationBox />,
  document.getElementById('FilterableApplicationBoxcontainer')
);