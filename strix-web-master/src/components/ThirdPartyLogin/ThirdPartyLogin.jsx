import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import './ThirdPartyLogin.scss';

class ThirdPartyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="third-party-login-form">
        <img src={this.props.logo} alt="Solidmation" />

        <div className="login-box">
          <p className="help-text">
            { this.props.helpText }
          </p>

          <FormControl
            id="username"
            pattern=".{4,}"
            name="email"
            bsClass="form-control login-input"
            type="text"
            placeholder="Email"
            value={this.state.email}
            disabled={this.props.loggingIn}
            onChange={this.handleChange}
          />

          <FormControl
            pattern=".{4,}"
            name="password"
            bsClass="form-control password-input login-input"
            type="password"
            placeholder="Contraseña"
            value={this.state.password}
            disabled={this.props.loggingIn}
            onChange={this.handleChange}
          />

          {
            this.props.errorMessage &&
            <div className="login-form-error-wrapper js-form__err-animation">
              <p className="login-form-error">
                {this.props.errorMessage}
              </p>
            </div>
          }
          {
            this.props.loggingIn &&
            <div className="login-spinner-box">
              <i className="icon icon-spinner icon-spin loading-icon" />
            </div>
          }
        </div>

        <button
          className="btn btn-lg btn-primary next-button"
          onClick={this.handleSubmit}
        >
          Siguiente
        </button>
      </div>
    );
  }
}

ThirdPartyLogin.propTypes = {
  login: PropTypes.func,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  logo: PropTypes.string,
  loggingIn: PropTypes.bool,
};

export default ThirdPartyLogin;
