import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.scss';

const Spinner = ({ fontSize, color, margin, style }) => (
  <div className="spinner-container" style={{ ...style }}>
    <i
      style={{ fontSize, color, margin }}
      className="icon icon-spinner icon-spin"
    />
  </div>
);

Spinner.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.string,
  style: PropTypes.object,
};

Spinner.defaultProps = {
  style: {},
};

export default Spinner;
