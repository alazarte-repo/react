import React from 'react';
import PropTypes from 'prop-types';
import 'react-ios-switch/build/bundle.css';
import './Offline.scss';


function Offline(props) {
  return (
    <div className="offlineIndicatorLabel">
      <i className={'icon icon-blocked'} />
      <div>{props.children}</div>
    </div>
  );
}


Offline.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};


export default Offline;
