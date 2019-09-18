import React from 'react';
import './styles.css';

const Header = () => (
  <header className="main-header">
    <h1 className="main-header__title">
      <i className="list alternate outline icon" />
          Todo App
    </h1>
    <a href="https://github.com/flymans">
      <i className="huge github icon" />
    </a>
  </header>
);
export default Header;
