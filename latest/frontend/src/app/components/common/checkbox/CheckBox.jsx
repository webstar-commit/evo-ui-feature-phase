import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    const labelClasses = {
      crf: true,
      checked: this.state.value
    };
    const temporaryId = 'checkbox-' + _.uniqueId();
    return <span className="checkbox">
      <input type="checkbox" className="crf-i" id={ temporaryId }
             style={{ position: 'absolute', left: '-9999em'}}/>
      <label className={classNames(labelClasses)}
             htmlFor={ temporaryId }
             onClick={ () => { this.onClick() } }></label>
    </span>;
  }

  componentWillReceiveProps(nextProps) {
    (this.state.value !== nextProps.value) && this.setState({ value: nextProps.value });
  }

  onClick() {
    const newValue = !this.state.value;
    this.setState({value: newValue});
    this.raiseChange(newValue);
  }

  raiseChange(newValue) {
    this.props.onChange && this.props.onChange(newValue);
  }
}

export default CheckBox;
