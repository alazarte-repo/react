import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';

const ListItem = ({ text }) => (
  <div className="list-item">
    <span className="label">{ text }</span>
  </div>
);

ListItem.propTypes = {
  text: PropTypes.string,
};

export default ListItem;
