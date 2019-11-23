import React from 'react';
import { Link } from 'react-router';
export default class Menu extends React.Component {
  render() {
    // TODO add className="current" to the current LI
    return <ul className="menu">
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/system">System</Link></li>
      <li><Link to="/application">Application</Link></li>
    </ul>;
  }
}
