import React from 'react';
import _ from 'lodash';

import Gauge from './Gauge.jsx';

const renderItem = (item) => {
  const name = item.name;
  const errorCount = item.errorCount;
  const deviationOfErrors = item.deviationOfErrors;
  const responseTime = item.responseTime;
  const gaugeValue = item.gaugeValue;
  return <article key={ _.uniqueId() }>
    <div className="left">
      <h4>{ name }</h4>
    </div>
    <div className="center">
      <Gauge value={ gaugeValue }/>
    </div>
    <div className="right">
      <ul>
        <li><span className="purple" style={ {width: errorCount + '%'} }></span></li>
        <li><span className="red" style={ {width: deviationOfErrors + '%'} }></span></li>
        <li><span className="yellow" style={ {width: responseTime + '%'} }></span></li>
      </ul>
    </div>
  </article>;
};

const renderItems = (items) => items.map((item) => renderItem(item));

const ApplicationAvailability = (props) => <div>
  <section className="overall-over v2">
    { renderItems(_.take(props.items, 5)) }
  </section>
  <div className="captions">
    <ul>
      <li><span className="dot purple"></span> Error Count</li>
      <li><span className="dot red"></span> DEVN of Errors</li>
      <li><span className="dot yellow"></span> Sample Response Time</li>
    </ul>
  </div>
</div>;

export default ApplicationAvailability;
