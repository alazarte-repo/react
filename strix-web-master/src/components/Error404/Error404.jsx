import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.scss';


function Error404() {
  const url = '/dashboard';
  return (
    <div className="error404-container">
      <h1>Error 404</h1>
      <h2>Pagina no encontrada</h2>
      <p>Esta pagina no existe, vuelve para continuar utilizando nuestros servicios.</p>
      <Link to={url}>
        <button className="btn btn-lg btn-primary btn-back">Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default Error404;
