import React from 'react';
import './styles.css';

const Footer = ({ counter }) =>    
  (
    <footer className="main-footer">
      <span className="main-footer__counter">{counter} task left</span>
    </footer>
  )
export default Footer;
