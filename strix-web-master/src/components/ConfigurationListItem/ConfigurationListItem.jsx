import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ConfigurationListItem.scss';


const ConfigurationListItem = ({ title, items, selectedItem, onItemClick }) => (
  <div className="configuration-panel">
    <div className="title">
      <span>{ title }</span>
    </div>
    {
      items.map(item => (
        <Link to={item.url} className="card-basic-info-name" key={item.id}>
          <div
            className={`configuration-card ${item.id === selectedItem ? 'active' : ''}`}
            key={item.id}
            onClick={() => onItemClick(item)}
          >
            <i className={`icon ${item.icon}`} />
            { item.name }
          </div>
        </Link>
      ))
    }
  </div>
);

ConfigurationListItem.propTypes = {
  onItemClick: PropTypes.func,
  title: PropTypes.string,
  items: PropTypes.array,
  selectedItem: PropTypes.string,
};

export default ConfigurationListItem;
