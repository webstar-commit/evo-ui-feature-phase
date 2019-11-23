import React from 'react';

const mockAvatarUrl = require('../../../img/1.png');

export default class User extends React.Component {
  render() {
    return <div className="user">
      <a href="#"><img src={ mockAvatarUrl } alt=""/><span className="name">Tiffany Bradley</span></a>
      <a href="#" className="down"></a>
    </div>;
  }
}
