import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import SolidMationLogo from 'images/solidmation-logo.png';
import ListItem from '../../../ListItem';
import './HomeDetails.scss';

const HomeDetails = ({ label, list, onClickNext }) => (
  <div className="home-details">
    <div className="information-box">
      <p className="help-text">
        <span className="color-primary-color"> { label } </span> contiene los siguientes servicios:
      </p>
    </div>

    <div className="service-logo">
      <img src={SolidMationLogo} alt="Solidmation" />
    </div>

    <Scrollbars style={{ height: '70%', width: '100%', marginBottom: '15px' }}>
      { list.map(x => <ListItem key={x.id} text={x.label} />) }
    </Scrollbars>

    <button
      className="btn btn-lg btn-primary next-button"
      onClick={onClickNext}
    >
      Siguiente
    </button>
  </div>
);

HomeDetails.propTypes = {
  onClickNext: PropTypes.func,
  label: PropTypes.string,
  list: PropTypes.array,
};

export default HomeDetails;
