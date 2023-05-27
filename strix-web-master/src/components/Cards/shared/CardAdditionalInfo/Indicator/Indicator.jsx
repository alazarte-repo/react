import React from 'react';
import PropTypes from 'prop-types';
import './Indicator.scss';


function Indicator(props) {
  return (
    <div className="indicator-container">
      <span className="indicator-title">{props.title}</span>
      <span className="indicator-data">{props.data} </span>
    </div>
  );
}

Indicator.propTypes = {
  title: PropTypes.string,
  data: PropTypes.string,
};

export default Indicator;
