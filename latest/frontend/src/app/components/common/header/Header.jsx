import React from 'react';
import MenuTrigger from './MenuTrigger.jsx';
import Menu from './Menu.jsx';
import User from './User.jsx';
import SearchForm from './SearchForm.jsx';

export default class Header extends React.Component {
  render() {
    return <header id="header">
      <div className="top">
        <div className="container">
          <a href="#" id="logo" title="ProjectName">ProjectName</a>

          <MenuTrigger />
          <Menu />

          <User />
        </div>
      </div>

      <div className="bottom">
        <div className="container">

            <h1>Overall Health</h1>
          <div className="right">
            <SearchForm />
            <span className="div"></span>
            <a href="#" className="btn btn-add"><span>Create App</span></a>
          </div>
        </div>
      </div>
    </header>;
  }
}





