import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AlternativeLayout from '../AlternativeLayout';
import { PrimaryColor } from '../../constants/colors';
import Spinner from '../../components/Spinner';
import './VerifyUsername.scss';

class VerifyUsername extends Component {
  componentDidMount() {
    this.props.verifyUsername(this.props.username, this.props.token);
  }

  render() {
    return (
      <AlternativeLayout>
        <div className="verify-username">
          {
            this.props.verifying &&
            <div className="verification-message">
              <Spinner
                fontSize="72pt"
                color={PrimaryColor}
                style={{ width: 'auto', marginRight: '20px' }}
              />
              <div className="text-content">
                <h1>Verificando...</h1>
                <p>Espere un momento mientras verificamos su cuenta.</p>
              </div>
            </div>
          }
          {
            !this.props.verifying &&
            <Fragment>
              {
                this.props.error &&
                <div className="verification-message">
                  <span className="glyphicon glyphicon-remove-sign" />
                  <div className="text-content">
                    <h1>¡Ha ocurrido un error!</h1>
                    <p>{this.props.errorMessage || 'La cuenta no se ha podido verificar, por favor intente de nuevo en unos minutos.'}</p>
                  </div>
                </div>
              }
              {
                !this.props.error &&
                <div className="verification-message">
                  <span className="glyphicon glyphicon-ok-sign" />
                  <div className="text-content">
                    <h1>¡Verificación exitosa!</h1>
                    <p>La verificación de tu cuenta ha sido exitosa. Si no vuelves a la página
                    principal en 10 segundos <b><a href="/"> has click aquí</a></b>.</p>
                  </div>
                </div>
              }
            </Fragment>
          }
        </div>
      </AlternativeLayout>
    );
  }
}

VerifyUsername.propTypes = {
  username: PropTypes.string,
  token: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  verifying: PropTypes.bool,
  verifyUsername: PropTypes.func,
};

export default VerifyUsername;
