import React from 'react';
import classNames from 'classnames';

const VIEW_TYPE_CARDS = 'cards';
const VIEW_TYPE_ROWS = 'rows';

const ViewTypeSelector = (props) => <div className="view-type">
  <a href="javascript:void(0)"
     className={classNames({type: true, current: props.currentViewType === VIEW_TYPE_CARDS})}
     onClick={() => { props.onViewTypeClicked(VIEW_TYPE_CARDS)} }><span className="ico-cols"></span></a>
  <a href="javascript:void(0)"
     className={classNames({type: true, current: props.currentViewType === VIEW_TYPE_ROWS})}
     onClick={() => { props.onViewTypeClicked(VIEW_TYPE_ROWS)} }><span className="ico-rows"></span></a>
</div>;

export default ViewTypeSelector;
