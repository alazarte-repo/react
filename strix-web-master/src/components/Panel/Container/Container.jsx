import React from 'react';
import PropTypes from 'prop-types';
import Body from '../Body';
import Header from '../Header';
import Footer from '../Footer';
import './styles.scss';


function Container({ children, className }) {
  return (
    <div className={`custom-panel-container ${className}`}>
      { children }
    </div>
  );
}

Container.Body = Body;
Container.Header = Header;
Container.Footer = Footer;

Container.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
};

Container.defaultProps = {
  className: '',
};

export default Container;

