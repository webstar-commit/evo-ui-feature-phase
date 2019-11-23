import React from 'react';

const imageUrls = {
  close: require('../../../img/ico_close.png')
};

const CloseButton = (props) => <a href="javascript:void(0)" className="close"
                                  onClick={ () => { props.onClick && props.onClick() } }>
  <img src={ imageUrls['close'] } alt=""/>
</a>;

export default CloseButton;
