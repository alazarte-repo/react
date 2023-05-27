import React from 'react';
import PropTypes from 'prop-types';
import './GoArrow.scss';

const GoArrow = ({ onClick, rotated }) => {
  const arrowClass = rotated ? 'icon icon-arrow go-arrow rotated ' : 'icon icon-arrow go-arrow';
  return (
    <i
      onClick={onClick}
      className={arrowClass}
    />
  );
};

GoArrow.propTypes = {
  onClick: PropTypes.func,
  rotated: PropTypes.bool,
};

export default GoArrow;
