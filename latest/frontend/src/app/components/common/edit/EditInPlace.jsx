import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const imageUrls = {
  check: require('../../../img/check_16_w.png'),
  close: require('../../../img/close_16_w.png')
};

var editInPlaceInstances = []; // saving all instances of edit in place
                               // using it for creating the tab effect

export default class EditInPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: props.editing || false,
            value: props.value,
            tabbedTo: props.tabbedTo || false,
            clickedTo: props.clickedTo || false,
        };
        editInPlaceInstances.push(this);
    }

    reset() {
        this.setState({
            editing: this.props.editing || false,
            value: this.props.value,
            tabbedTo: this.props.tabbedTo || false,
            clickedTo: this.props.clickedTo || false,
        });
    }
  
  render() {
    if (this.state.editing) {
      const classes = {'edit-in-place': true, block: this.props.block};
      const buttonsClasses = {'edit-in-place-buttons': true, 'overlay-eip-buttons': this.props.overlayButtons}
      const styles = this.props.styles ? this.props.styles : {};
      return <span className={ classNames(classes) }>
        <textarea ref="textarea"
                  style={ styles }
                  value={ this.state.value }
                  onChange={ (evt) => { this.onInputValueChange(evt) } }
                  onKeyDown={ (evt) => { this.onKeyDown(evt) } }></textarea>
        <span className={ classNames(buttonsClasses) }>
          <a href="javascript:void(0)"
             className={ this.props.overlayButtons ? "tiny-eip-buttons" : "" }
             onClick={ () => { this.onCancel() } }>
              <img className={ this.props.overlayButtons ? "tiny-eip-img-buttons" : "" } src={ imageUrls['close'] } alt=""/>
          </a>
          <a href="javascript:void(0)"
             className={ this.props.overlayButtons ? "tiny-eip-buttons" : "" }
             onClick={ () => { this.onApply() } }>
              <img className={ this.props.overlayButtons ? "tiny-eip-img-buttons" : "" } src={ imageUrls['check'] } alt=""/>
          </a>
        </span>
      </span>;
    } else {
      const text = this.state.value ? this.state.value : this.props.placeholder;
      const decoratedText = this.props.decorator ? this.props.decorator(text) : text;
      const classes = {'edit-in-place': true, block: this.props.block, placeholder: !this.state.value, error: this.props.error};
      return <span className={ classNames(classes) } style={ {'height': 'inherit'} } onClick={ () => { this.onClick() }}>{ decoratedText }</span>;
    }
  }

    componentDidUpdate() {
        if (this.state.editing && this.state.clickedTo) {
            this.state.clickedTo = false;
            // close the other boxes except the current one
            for (let i = 0; i < editInPlaceInstances.length; i++) {
                if (this != editInPlaceInstances[i]) {
                    editInPlaceInstances[i].setState({editing: false});
                }
            }

            let nextClick = ReactDOM.findDOMNode(this.refs.textarea);
            setTimeout(function () {
                nextClick.focus();
            }, 0);
        }

        if(this.state.editing && this.state.tabbedTo) {
            this.state.tabbedTo = false;
            let nextTab = ReactDOM.findDOMNode(this.refs.textarea);

            setTimeout(function () {
                nextTab.focus();
            }, 0);
        }

    }

    onInputValueChange(evt) {
        let newValue = evt.target.value;
        console.log(newValue);
        this.setState({value: newValue});
        this.props.onApply && this.props.onApply(this.state.value);
        this.props.onChange && this.props.onChange(newValue);
    }

    onClick() {
        this.setState({editing: true, tabbedTo: false, clickedTo: true});
        console.log(3123);
    }


    onKeyDown(evt) {
        if (evt.keyCode === 13) {
            this.onApply();
        }
        if (evt.keyCode === 27) {
            this.onCancel();
        }
        // This is for the tab functionality
        if (evt.keyCode === 9) {
            this.onApply();
            ReactDOM.findDOMNode(this.refs.textarea).blur();
            if (editInPlaceInstances.indexOf(this) + 1 >= editInPlaceInstances.length) { // the next element
                editInPlaceInstances[0].setState({editing: true, tabbedTo: true}); // go back to first element if reach the end
            } else {
                editInPlaceInstances[editInPlaceInstances.indexOf(this) + 1].setState({editing: true, tabbedTo: true});
            }
        }
    }

    onCancel() {
        this.reset();
        this.props.onCancel && this.props.onCancel();
    }

    onApply() {
        this.setState({editing: false, tabbedTo: false, clickedTo: false});
        this.props.onApply && this.props.onApply(this.state.value);
    }
}
