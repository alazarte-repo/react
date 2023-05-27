import React from 'react';
import PropTypes from 'prop-types';
import StrixLogoMenu from 'images/strix-menu-logo.png';
import './TopBar.scss';

function TopBar(props) {
  return (
    <header className="strix-header">
      <div className="strix-logo">
        <img src={StrixLogoMenu} alt="strix" />
      </div>
      <div className="header-children">
        {props.children}
      </div>
    </header>
  );
}

TopBar.propTypes = {
  children: PropTypes.array,
};
export default TopBar;
