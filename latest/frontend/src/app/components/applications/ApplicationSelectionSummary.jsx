import React from 'react';

import CloseButton from '../common/button/CloseButton.jsx';
import Button from '../common/button/Button.jsx';

const ApplicationSelectionSummary = (props) => <div className="options">
  <p>Select your service applications below:</p>

  <div className="right">
    <span className="selected">{ props.applicationCount } applications selected</span>
    <Button onClick={ () => { props.onApply && props.onApply() } }>Create</Button>
    <CloseButton onClick={ () => { props.onCancel && props.onCancel() } } />
  </div>
</div>;

export default ApplicationSelectionSummary;
