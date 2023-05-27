import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ForgotPasswordEmailForm.scss';

class ForgotPasswordEmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.forgotPasswordRequestCode(this.state.email);
  }
  render() {
    return (
      <div className="forgot-password-email-form-container">
        <a onClick={() => this.props.lostPassword('')}>
          <i className="icon icon-multiply pull-right" />
        </a>
        <h1>Olvidé mi contraseña</h1>
        <p>Completá tu mail y te enviaremos un link para recuperar tu contraseña</p>
        <Form onSubmit={this.handleSubmit} className="forgot-password-email-form">
          <FormControl
            name="email"
            bsClass="form-control password-input"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleSubmit} bsClass="btn btn-lg btn-primary btn-continuar" type="submit">
            Recuperar contraseña
          </Button>
        </Form>
      </div>
    );
  }
}

ForgotPasswordEmailForm.propTypes = {
  forgotPasswordRequestCode: PropTypes.func,
  lostPassword: PropTypes.func,
};

export default ForgotPasswordEmailForm;
