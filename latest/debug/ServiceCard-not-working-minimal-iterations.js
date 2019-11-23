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

class FilterableServiceCardBox extends React.Component {
  render() {
  return (
							
				<ServiceCardList />
                            
   
  )
  }
};

      
class ServiceCardList extends React.Component {
  render() {
  return (
							
      
<div className="list-type-r cols-list active">
   <div className="service-card">
      <div className="left-side">
         <div className="avatar">
            <img src="img/2.png" alt=""/>
         </div>
         <h3>MDL_Gateway</h3>
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
      <h3 className="active">MDL_Gateway Applications</h3>
      <div className="inside active">
         <section className="add-aplication">
            <article>
               <div className="head">
                  <img src="img/1.png" alt=""/>
                  <h4><a href="#">Application_123</a></h4>
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
                  <li><strong>DEPLOYMENT</strong><span>Undeployed</span></li>
                  <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
                  <li><strong>SERVICE</strong><span>None</span></li>
                  <li><strong>UPTIME</strong><span>12 hours 2 Min</span></li>
               </ul>
            </article>
            <article>
               <div className="head">
                  <img src="img/1.png" alt=""/>
                  <h4><a href="#">Application_123</a></h4>
                  <div className="tags">
                     <a href="#" className="stat">
                     <img src="img/ico_red.png" width="12" alt=""/>
                     <span>2 ERRORS</span>
                     </a>
                     <a href="#" className="stat ins">
                     <img src="img/ico_green.png" width="13" alt=""/>
                     <span>12 INSTANCES</span>
                     </a>
                  </div>
               </div>
               <ul>
                  <li><strong>DEPLOYMENT</strong><span>Undeployed</span></li>
                  <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
                  <li><strong>SERVICE</strong><span>None</span></li>
                  <li><strong>UPTIME</strong><span>12 hours 2 Min</span></li>
               </ul>
            </article>
            <article>
               <div className="head">
                  <img src="img/1.png" alt=""/>
                  <h4><a href="#">Application_123</a></h4>
                  <div className="tags">
                     <a href="#" className="stat">
                     <img src="img/ico_red.png" width="12" alt=""/>
                     <span>2 ERRORS</span>
                     </a>
                     <a href="#" className="stat ins">
                     <img src="img/ico_green.png" width="13" alt=""/>
                     <span>12 INSTANCES</span>
                     </a>
                  </div>
               </div>
               <ul>
                  <li><strong>DEPLOYMENT</strong><span>Undeployed</span></li>
                  <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
                  <li><strong>SERVICE</strong><span>None</span></li>
                  <li><strong>UPTIME</strong><span>12 hours 2 Min</span></li>
               </ul>
            </article>
            <article>
               <div className="head">
                  <img src="img/1.png" alt=""/>
                  <h4><a href="#">Application_123</a></h4>
                  <div className="tags">
                     <a href="#" className="stat">
                     <img src="img/ico_red.png" width="12" alt=""/>
                     <span>2 ERRORS</span>
                     </a>
                     <a href="#" className="stat ins">
                     <img src="img/ico_green.png" width="13" alt=""/>
                     <span>12 INSTANCES</span>
                     </a>
                  </div>
               </div>
               <ul>
                  <li><strong>DEPLOYMENT</strong><span>Undeployed</span></li>
                  <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
                  <li><strong>SERVICE</strong><span>None</span></li>
                  <li><strong>UPTIME</strong><span>12 hours 2 Min</span></li>
               </ul>
            </article>
            <article>
               <div className="head">
                  <img src="img/1.png" alt=""/>
                  <h4><a href="#">Application_123</a></h4>
                  <div className="tags">
                     <a href="#" className="stat">
                     <img src="img/ico_red.png" width="12" alt=""/>
                     <span>2 ERRORS</span>
                     </a>
                     <a href="#" className="stat ins">
                     <img src="img/ico_green.png" width="13" alt=""/>
                     <span>12 INSTANCES</span>
                     </a>
                  </div>
               </div>
               <ul>
                  <li><strong>DEPLOYMENT</strong><span>Undeployed</span></li>
                  <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
                  <li><strong>SERVICE</strong><span>None</span></li>
                  <li><strong>UPTIME</strong><span>12 hours 2 Min</span></li>
               </ul>
            </article>
            <article>
               <div className="head">
                  <img src="img/1.png" alt=""/>
                  <h4><a href="#">Application_123</a></h4>
                  <div className="tags">
                     <a href="#" className="stat">
                     <img src="img/ico_red.png" width="12" alt=""/>
                     <span>2 ERRORS</span>
                     </a>
                     <a href="#" className="stat ins">
                     <img src="img/ico_green.png" width="13" alt=""/>
                     <span>12 INSTANCES</span>
                     </a>
                  </div>
               </div>
               <ul>
                  <li><strong>DEPLOYMENT</strong><span>Undeployed</span></li>
                  <li><strong>RESPONSE TIME</strong><span>12 SEC</span></li>
                  <li><strong>SERVICE</strong><span>None</span></li>
                  <li><strong>UPTIME</strong><span>12 hours 2 Min</span></li>
               </ul>
            </article>
         </section>
      </div>
   </div>
</div>
      
      

      
      
  )
  }
};
  
      
ReactDOM.render(
  <FilterableServiceCardBox />,
  document.getElementById('FilterableServiceCardBoxcontainer')
);


