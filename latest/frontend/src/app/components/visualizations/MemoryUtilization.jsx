import React from 'react';
import TruncateText from '../common/TruncateText.jsx';

const renderItems = (items) => _.map(items, (item, index)  => {
  return  <article>
    <h4 className="appName"><TruncateText limit="28">{item.container.name.substr(5)}</TruncateText></h4>
    <div className="percent-row">
      <div className="right">
        <h4>{Math.round(item.percent)}%</h4>
      </div>
      <div className="left">
        <ul>
          <li><span className="purple" style={ {width: item.percent+'%'} }></span></li>
        </ul>
      </div>
    </div>
  </article>
});


/**
 * A component for CPU Utilization visualization.
 * @param props React component properties
 * @constructor
 */
const MemoryUtilization = (props) => <section id="memory" className="overall-over">
  { renderItems(props.items) }
</section>;




export default MemoryUtilization;
