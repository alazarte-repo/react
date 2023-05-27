import React from 'react';
import PropTypes from 'prop-types';
import './Timeline.scss';

function Timeline(props) {
  return (
    <div className={`timeline-icon ${props.type}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
        <title>Timeline Icon</title>
        <g id="start" data-name="Layer 1">
          <circle className={props.type} cx="0.5" cy="0.5" r="0.35" />
        </g>
      </svg>
    </div>
  );
}

Timeline.propTypes = {
  type: PropTypes.string,
};

export default Timeline;
