import React from 'react';
import PropTypes from 'prop-types';
import SwitchButton from 'react-ios-switch';
import 'react-ios-switch/build/bundle.css';
import './CardSwitchButton.scss';


function CardSwitchButton(props) {
  const loadingIcon = props.isLoading ? 'icon-spinner icon-spin home-spinner' : false;
  const icon = loadingIcon || props.icon;

  return (
    <div className={`switchButtonContainer ${props.className}`}>
      <div className="switchButtonLabel">
        { props.icon && <i className={`icon ${icon}`} /> }
        <div>{props.children}</div>
      </div>
      <SwitchButton
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
      />
    </div>
  );
}


CardSwitchButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};


export default CardSwitchButton;
