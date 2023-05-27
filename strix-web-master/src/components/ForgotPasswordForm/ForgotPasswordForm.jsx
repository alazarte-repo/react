import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ForgotPasswordForm.scss';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatedPassword: '',
      regStep: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.regStep(nextProps.forgotPassStep);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const password = (this.state.password === this.state.repeatedPassword);
    if (password) {
      this.props.resetPassword(
        this.props.username,
        this.props.token,
        this.state.password,
      );
    }
  }

  render() {
    return (
      <div className="create-password-container">
        <p>
          Para comenzar a usar Strix,
          por favor crea una contraseña y guardala en un lugar seguro
        </p>
        <Form onSubmit={this.handleSubmit} className="form-create-password">
          <FormControl
            name="password"
            bsClass="form-control password-input"
            type="password"
            placeholder="Contraseña"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <FormControl
            name="repeatedPassword"
            bsClass="form-control password-input"
            type="password"
            placeholder="Repetir contraseña"
            value={this.state.repeatedPassword}
            onChange={this.handleChange}
          />
          <Button
            bsClass="btn btn-lg btn-primary btn-continuar"
            type="submit"
            onClick={this.handleSubmit}
          >
            Continuar
          </Button>
        </Form>
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  forgotPassStep: PropTypes.string,
  resetPassword: PropTypes.func,
  regStep: PropTypes.func,
  username: PropTypes.string,
  token: PropTypes.string,
};

export default ForgotPasswordForm;
