import React from 'react';
import TruncateText from '../common/TruncateText.jsx';

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

const renderItems = (items) => _.map(items, (item, index)  => {
  return  <article>
    <h4><TruncateText limit="28">{index + 1}. {item.container.name.substr(5)}</TruncateText></h4>
    <h4 className="text-right">{bytesToSize(item.networks.cali0.tx_bytes)} / {bytesToSize(item.networks.cali0.rx_bytes)} </h4>
  </article>
});

/**
 * A component for CPU Utilization visualization.
 * @param props React component properties
 * @constructor
 */
const Network = (props) => <section id="network" className="overall-over">
  { renderItems(props.items) }
</section>;



export default Network;
