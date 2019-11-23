import React from 'react';

const renderItem = (item) => {
	  const name = item.name;
	    const cpu = Math.floor(item.cpu);
	      const network = Math.floor(item.network);
	        const memory = Math.floor(item.memory);
		  const disk = Math.floor(item.disk);
		    return <article key={ _.uniqueId() }>
			        <div className="left">
				      <h4>{ name }</h4>
				          </div>
					      <div className="right">
					            <ul>
						            <li><span className="blue" style={ {width: cpu + '%'} }></span></li>
							            <li><span className="purple" style={ {width: network + '%'} }></span></li>
								            <li><span className="red" style={ {width: memory + '%'} }></span></li>
									            <li><span className="yellow" style={ {width: disk + '%'} }></span></li>
										          </ul>
											      </div>
											        </article>;
};

const renderItems = (items) => items.map((item) => renderItem(item));

const ContainerUtilization = (props) => <div>
  <section className="overall-over">
      { renderItems(_.take(props.items, 5)) }
        </section>
	  <div className="captions">
	      <ul>
	            <li className="cpu"><span className="dot blue"></span> CPU</li>
		          <li className="net"><span className="dot purple"></span> Network</li>
			        <li className="memory"><span className="dot red"></span> Memory</li>
				      <li><span className="dot yellow"></span> Disk</li>
				          </ul>
					    </div>
					    </div>;

					    export default ContainerUtilization;
