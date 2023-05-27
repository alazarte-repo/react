import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './CreatePassword.scss';

class CreatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatedPassword: '',
      acceptedTOS: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleToggle = () => {
    this.setState({ acceptedTOS: !this.state.acceptedTOS });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const password = (this.state.password === this.state.repeatedPassword);
    const acceptedTOS = this.state.acceptedTOS;
    if (password && acceptedTOS) {
      return this.props.createPassword(
        this.state.password,
        this.props.params.token,
        this.props.params.username,
      );
    }
    return null;
  }

  render() {
    return (
      <div className="create-password-container">
        <p>
          Para comenzar a usar Strix,
          por favor crea una contraseña y guardala en un lugar seguro
        </p>
        <Form onSubmit={this.handleSubmit} className="form-create-password" >
          <FormControl
            pattern=".{4,}"
            name="password"
            bsClass="form-control password-input"
            type="password"
            placeholder="Contraseña"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <FormControl
            pattern=".{4,}"
            name="repeatedPassword"
            bsClass="form-control password-input"
            type="password"
            placeholder="Repetir contraseña"
            value={this.state.repeatedPassword}
            onChange={this.handleChange}
          />
          <div className="TOS-checkbox">
            <input
              name="TOS"
              type="checkbox"
              value={this.state.acceptedTOS}
              onChange={this.handleToggle}
            />
            <label>Acepto <a href="https://www.strix.com.ar/legales" target="_blank" rel="noopener noreferrer">terminos y condiciones</a></label>
          </div>
          <Button bsClass="btn btn-lg btn-primary btn-continuar" type="submit">
            Continuar
          </Button>
        </Form>
      </div>
    );
  }
}

CreatePassword.propTypes = {
  createPassword: PropTypes.func,
  params: PropTypes.object,
};

export default CreatePassword;
