import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

function ProfileMenuItem({ path, item, activePath, onClick, id }) {
  if (onClick != null) {
    return (
      <div className="profile-menu-item" onClick={onClick} id={id}>
        <h3>{ item }</h3>
      </div>
    );
  }
  return (
    <div className={`profile-menu-item ${activePath === path ? 'active' : ''}`}>
      <Link to={path}>
        <h3>{ item }</h3>
      </Link>
    </div>
  );
}

ProfileMenuItem.propTypes = {
  path: PropTypes.string,
  item: PropTypes.string,
  activePath: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default ProfileMenuItem;
