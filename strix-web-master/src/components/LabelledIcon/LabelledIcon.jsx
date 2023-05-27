import React from 'react';
import PropTypes from 'prop-types';
import './LabelledIcon.scss';

const LabelledIcon = ({ label, icon, colorClass }) => (
  <div className="labelled-icon">
    <i className={`icon ${icon} ${colorClass || ''}`} />
    <span className="label">{label}</span>
  </div>
);

LabelledIcon.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  colorClass: PropTypes.string,
};

export default LabelledIcon;
