import React from 'react';
import PropTypes from 'prop-types';
import GoArrow from '../GoArrow';
import './SectionTitle.scss';

const SectionTitle = ({ text, backArrow }) => (
  <div className="title-container">
    { backArrow && <GoArrow rotated /> }
    <h1 className="title-right-panel"> { text } </h1>
  </div>
);

SectionTitle.propTypes = {
  text: PropTypes.string,
  backArrow: PropTypes.bool,
};

export default SectionTitle;
