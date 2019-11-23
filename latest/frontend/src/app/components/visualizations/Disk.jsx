import React from 'react';
import TruncateText from '../common/TruncateText.jsx';

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const renderItems = (items) => _.map(items, (item, index)  => {
  return <article>
    <h4><TruncateText limit="28">{index + 1}. {item.name.substr(5)} </TruncateText></h4>
    <div className="percent-row">
      <div className="right">
        <h4>{bytesToSize(item.read)}</h4><h4>{bytesToSize(item.write)}</h4>
      </div>
      <div className="left">
        <ul>
          <li className="purple-bar"><span className="purple" style={ {width: '80%'} }></span></li>
          <li><span className="red" style={ {width: '75%'} }></span></li>
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
const Disk = (props) => <section id="disk" className="overall-over">
  { renderItems(props.items) }
</section>;



export default Disk;
