import React from 'react';
import PropTypes from 'prop-types';
import './Stepper.scss';

const Stepper = ({ steps, currentStep }) => (
  <div className="stepper">
    <div className="stepper-progress-bar">
      {
        steps.map((step, index) => (
          <div key={step} className="dot-container">
            <div className={`dot-bar ${index + 1 <= currentStep ? 'done' : ''}`}>
              <div className="bar" />
              <div className="dot" />
              <div className="bar" />
            </div>
            <span className={`stepper-label ${index + 1 === currentStep ? 'active' : ''}`}>
              { steps[index] }
            </span>
          </div>
        ))
      }
    </div>
  </div>
);

Stepper.propTypes = {
  steps: PropTypes.arrayOf(String),
  currentStep: PropTypes.number,
};

Stepper.defaultProps = {
  steps: [],
  currentStep: 1,
};

export default Stepper;
