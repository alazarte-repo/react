import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ForgotPassSuccess(props) {
  return (
    <div className="forgot-pass-success">
      <a onClick={() => props.lostPassword('')}>
        <i className="icon icon-multiply pull-right" />
      </a>
      <h1>Revisá tu casilla de mail</h1>
      <p>
        En breve te enviaremos un mail, revisá tu casilla
        (incluso la de spam) y usá el link para recuperar tu contraseña
      </p>
      <p>si no recibís el mail, hacé <a onClick={() => props.lostPassword('emailForm')}>click aquí.</a></p>
    </div>
  );
}

ForgotPassSuccess.propTypes = {
  lostPassword: PropTypes.func,
};

export default ForgotPassSuccess;
