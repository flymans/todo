import React from 'react';
import './styles.css';

const Header = () => (
    <header className="main-header">
        <h1 className="main-header__title">
            <i className="list alternate outline icon" />
            Todo App
        </h1>
        <div className="main-header__logo">
            <a href="https://github.com/flymans">
                <i className="huge github icon" />
            </a>
        </div>
    </header>
);
export default Header;
