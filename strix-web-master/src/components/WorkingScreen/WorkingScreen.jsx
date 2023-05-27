import React from 'react';
import PropTypes from 'prop-types';
import './WorkingScreen.scss';


const WorkingScreen = ({ message }) => (
  <div className="working-screen">
    <span> { message } </span>
    <div className="icon-container">
      <i className="icon icon-spinner icon-spin loading-icon" />
    </div>
  </div>
);

WorkingScreen.propTypes = {
  message: PropTypes.string,
};

export default WorkingScreen;
