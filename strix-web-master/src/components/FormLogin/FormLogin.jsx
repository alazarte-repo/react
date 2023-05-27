import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { history } from '../../store';
import './FormLogin.scss';

class FormLogin extends Component {
  static goToRegistration() {
    history.push('/register/new');
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.props.data.username, this.props.data.password);
  };

  changeUsername = (event) => {
    this.emitChange({ ...this.props.data, username: event.target.value });
  };

  changePassword = (event) => {
    this.emitChange({ ...this.props.data, password: event.target.value });
  };

  emitChange = (newFormState) => {
    this.props.changeForm(newFormState);
  };

  clearError = () => {
    this.props.clearError();
  };

  showError = () => (
    <div className="login-form-error-wrapper js-form__err-animation">
      <p className="login-form-error">
        {this.props.error}
      </p>
    </div>
  );

  render() {
    return (
      <Form onSubmit={this.onSubmit} className="form-login">
        {this.props.error && this.showError()}
        <FormControl
          bsClass="form-control"
          value={this.props.data.username}
          type="email"
          placeholder="Email"
          id="username"
          onChange={this.changeUsername}
        />
        <FormControl
          bsClass="form-control password-input"
          value={this.props.data.password}
          type="password"
          placeholder="Contraseña"
          onChange={this.changePassword}
        />
        <a href="#" onClick={() => this.props.lostPassword('emailForm')} className="pull-right forgot-password">Olvidé mi contraseña</a>
        <Button
          bsClass="btn btn-lg btn-primary btn-block"
          className="btn-login signin"
          type="submit"
        >
          Iniciar sesión
        </Button>
        <Button
          bsClass="btn btn-lg btn-primary btn-block"
          className="btn-login signup"
          onClick={FormLogin.goToRegistration}
        >
          Crear cuenta
        </Button>
      </Form>
    );
  }
}

FormLogin.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  lostPassword: PropTypes.func,
  onSubmit: PropTypes.func,
  changeForm: PropTypes.func,
  clearError: PropTypes.func,
  error: PropTypes.string,
};

export default FormLogin;
