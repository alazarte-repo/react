import React from 'react';
import PropTypes from 'prop-types';
import './WorkingIcon.scss';


const WorkingIcon = (props) => {
  const { message, width, height, textSize, backgroundColor,
    textSeparation, spinnerSize, spinnerColor } = props;
  return (
    <div className="working-icon" style={{ width, height, backgroundColor: backgroundColor || '' }}>
      <span style={{ fontSize: textSize, marginBottom: textSeparation }}>
        { message }
      </span>
      <i
        className="icon icon-spinner icon-spin loading-icon"
        style={{ fontSize: spinnerSize, color: spinnerColor || '' }}
      />
    </div>
  );
};

WorkingIcon.propTypes = {
  message: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  textSize: PropTypes.string,
  textSeparation: PropTypes.string,
  spinnerSize: PropTypes.string,
  spinnerColor: PropTypes.string,
};

export default WorkingIcon;
