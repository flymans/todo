import React from 'react';
import './styles.css';

class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
          <h1 className="main-header__title">
            <i className="list alternate outline icon"></i>
            Todo App
          </h1>
          <a href="https://github.com/flymans"><i className="huge github icon"></i></a>
      </header>
    )
  }
}

export default Header;