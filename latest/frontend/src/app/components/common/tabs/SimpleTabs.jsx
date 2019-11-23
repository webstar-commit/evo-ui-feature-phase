import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const itemTitle = (item) => _.isObject(item) ? item.title : item;
const itemValue = (item) => _.isObject(item) ? item.value : _.camelCase(item);

const renderItems = (items, onItemClicked, currentValue) => items.map((item, index) => {
  const title = itemTitle(item);
  const value = itemValue(item);
  return <li key={index} className={classNames({current: value === currentValue})}>
    <a href="javascript:void(0)" onClick={ () => { onItemClicked(value)} }>{ title }</a>
  </li>;
});

const SimpleTabs = (props) => <div className="tabs">
  <ul>
    { renderItems(props.items, props.onItemClicked || function(){}, props.currentValue) }
  </ul>
  <div className="right">
    { props.children }
  </div>
</div>;

export default SimpleTabs;
