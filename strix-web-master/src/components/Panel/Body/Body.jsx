import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Body(props) {
  return (
    <div className={props.className} style={props.style}>
      { props.children }
    </div>
  );
}

Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

Body.defaultProps = {
  className: 'custom-panel-body',
  style: {},
};

export default Body;
