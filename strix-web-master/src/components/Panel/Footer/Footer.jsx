import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Footer = ({ children, style }) => (
  <div className="custom-panel-footer" style={style} >
    { children }
  </div>
);

Footer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Footer;
