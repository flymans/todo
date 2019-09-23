import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';
import './styles.css';

const Footer = ({counter, clear, showButton}) => (
    <footer className="main-footer">
        <span className="main-footer__counter">
            {counter} task{counter > 1 ? 's' : ''} left
        </span>
        {showButton && (
            <Button className="main-footer__clear" onClick={clear}>
                Clear finished tasks
            </Button>
        )}
    </footer>
);

Footer.propTypes = {
    counter: PropTypes.number.isRequired,
    clear: PropTypes.func.isRequired,
    showButton: PropTypes.bool.isRequired
};
export default Footer;
