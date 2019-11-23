import React from 'react';

const imageUrls = {
  close: require('../../../img/ico_red_close.png')
};

const CloseRedButton = (props) => <a href="javascript:void(0)" className="close"
                                  onClick={ () => { props.onClick && props.onClick() } }>
  <img src={ imageUrls['close'] } alt=""/>
</a>;

export default CloseRedButton;
