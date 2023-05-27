import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordError() {
  return (
    <div className="forgot-password-error-container">
      <p>
        El mail para restaurar su contraseña ha caducado, por favor haz click
        <Link to="/login"> aqui</Link> para solicitar otro </p>
    </div>
  );
}

export default ForgotPasswordError;
