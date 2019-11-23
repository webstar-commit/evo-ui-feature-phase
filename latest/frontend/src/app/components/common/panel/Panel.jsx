import React from 'react';

//import Button from '../button/Button.jsx';

const Panel = (props) => <div className="panel">
  <div className="head">
    <h3>{ props.title }</h3>
    {
      (() => {
        if (props.headingAside) {
          return props.headingAside;
        }
      })()
    }
  </div>
  <div className="body">
    { props.children }
  </div>
</div>;

export default Panel;
