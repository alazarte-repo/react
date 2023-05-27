import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './CreatePin.scss';

class CreatePin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: '',
      repeatedPin: '',
    };
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.pin === this.state.repeatedPin) {
      this.props.createPin(this.state.pin);
    }
  }

  render() {
    return (
      <div className="create-pin-container">
        <p>
          Crea tu PIN de 4 digitos y guardalo en un lugar seguro,
          vas a utilizarlo cuando tengas que activar alarmas,
          recuperar contraseñas, etc.
        </p>
        <Form onSubmit={this.handleSubmit} className="form-create-pin" >
          <FormControl
            pattern=".{4,4}"
            name="pin"
            bsClass="form-control password-input"
            type="password"
            placeholder="PIN"
            onChange={this.handleChange}
          />
          <FormControl
            pattern=".{4,4}"
            name="repeatedPin"
            bsClass="form-control password-input"
            type="password"
            placeholder="Repetir PIN"
            onChange={this.handleChange}
          />
          <Button bsClass="btn btn-lg btn-primary btn-continuar" type="submit">
            Continuar
          </Button>
        </Form>
      </div>
    );
  }
}

CreatePin.propTypes = {
  createPin: PropTypes.func,
};

export default CreatePin;
