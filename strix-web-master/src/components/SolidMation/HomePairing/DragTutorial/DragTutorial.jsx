import React from 'react';
import PropTypes from 'prop-types';
import SolidMationDrag from 'images/solidmation-drag.png';
import './DragTutorial.scss';

const DragTutorial = ({ onClickNext }) => (
  <div className="drag-tutorial">

    <div className="information-box">
      <p className="help-text"> Vinculá las casas de Solidmation con las de Strix. </p>

      <img src={SolidMationDrag} alt="DragDrop" />

      <p className="help-text">
        Arrastrá las casas de Solidmation por encima de las casas de Strix
        para que se vinculen
      </p>
    </div>

    <button
      className="btn btn-lg btn-primary next-button"
      onClick={onClickNext}
    >
      Siguiente
    </button>
  </div>
);

DragTutorial.propTypes = {
  onClickNext: PropTypes.func,
};

export default DragTutorial;
