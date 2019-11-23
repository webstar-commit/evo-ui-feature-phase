import React from 'react';

const imageUrls = {
  'ico_close': require('../../../img/ico_close.png')
};

export default class ModalBox extends React.Component {
  render() {
    return <div className="table0">
      <div className="cell">
        <div className="popup">
          <a href="javascript:void(0)" className="close" onClick={ () => { this.props.onClose && this.props.onClose() } }>
            <img src={ imageUrls['ico_close'] } alt=""/>
          </a>

          <h3>{ this.props.title }</h3>

          { this.props.children }

        </div>
      </div>
    </div>;
  }
}
