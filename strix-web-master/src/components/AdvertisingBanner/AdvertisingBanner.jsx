import React from 'react';
import PropTypes from 'prop-types';
import './AdvertisingBanner.scss';

const AdvertisingBanner = ({ link, className, show, showCloseButton, close, onClick }) => {
  if (show) {
    return (
      <div className={`bottom-banner ${className}`} onClick={onClick}>
        {
          showCloseButton &&
          <span className="close-link" onClick={close}> × </span>
        }
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="content">
            <div className="icon-container" >
              <i className="icon icon-service-car" />
              <i className="icon icon-service-home" />
              <i className="icon icon-service-moto" />
              <i className="icon icon-service-flex" />
            </div>

            <span>Conocé nuestros productos</span>
          </div>
        </a>
      </div>
    );
  }
  return null;
};

AdvertisingBanner.propTypes = {
  link: PropTypes.string,
  className: PropTypes.string,
  show: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  close: PropTypes.func,
  onClick: PropTypes.func,
};

AdvertisingBanner.defaultProps = {
  link: 'http://strix.com.ar',
  className: '',
  show: true,
  showCloseButton: false,
};

export default AdvertisingBanner;
