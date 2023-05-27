import React from 'react';
import PropTypes from 'prop-types';
import './WithLink.scss';

const WithLink = ({ url }) => (
  <div className="with-link-notification-detail">
    <a className="link" href={url}>
      <i className="icon icon-link link-icon" />
      <span className="link-text"> Más información </span>
    </a>
  </div>
);

WithLink.propTypes = {
  url: PropTypes.string,
};

export default WithLink;
