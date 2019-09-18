import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Footer = ({counter}) => (
    <footer className="main-footer">
        <span className="main-footer__counter">{counter} task left</span>
    </footer>
);

Footer.propTypes = {
    counter: PropTypes.number.isRequired
};
export default Footer;
