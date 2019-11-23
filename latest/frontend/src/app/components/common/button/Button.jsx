import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const Button = (props) => {
  const classes = classNames({
    'btn': true,
    'btn-grey': props.type === 'grey',
    'btn-add': props.type === 'add',
    'btn-blue': _.isUndefined(props.type) || props.type === 'blue'
  });
  return <a href="javascript:void(0)"
            className={ classes }
            onClick={ () => { props.onClick && props.onClick() } } >{ props.children }</a>;
};

export default Button;

