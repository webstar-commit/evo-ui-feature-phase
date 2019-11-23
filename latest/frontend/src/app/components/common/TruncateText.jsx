import React from 'react';

const TruncateText = (props) => {
  var text = props.children;
  if(Array.isArray(text) === true) {
  	text = text.join(' ');
  }

  var shortName = text;
  if(props.limit > 5 && text !== '' && text.length > props.limit) {
  	var text1= text.substring(0, props.limit-5) + "...";
  	var text2 = text.slice(-5);
  	shortName = text1 + text2;
  }

  return <span>{ shortName }</span>;
};

export default TruncateText;

