import React from 'react';
import PropTypes from 'prop-types';
import CreatePassword from './CreatePassword';
import CreatePin from './CreatePin';
import RegisterSuccessful from '../../components/RegisterSuccessful';
import ForgotPasswordError from '../../components/ForgotPasswordError';
import './Registration.scss';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      pin: '',
      registrationStep: 0,
    };
  }

  elementToRender = () => {
    switch (this.props.registrationStep) {
      case 'createPin':
        return <CreatePin />;
      case 'registrationSuccess':
        return <RegisterSuccessful />;
      case 'tokenExpired':
        return <ForgotPasswordError />;
      default:
        return (<CreatePassword params={this.props.match.params} />);
    }
  }

  render() {
    return (
      <div className="registration-form-container">
        <h1>Bienvenido a Strix</h1>
        <div className="breadcrumb-container">
          <div className={`first step-container ${(this.props.registrationStep === 'createPassword') ? 'active' : 'inactive'}`}>
            <span className="step">1</span>
            <span className="title">Crear contraseña</span>
          </div>
          <div className={`second step-container ${(this.props.registrationStep === 'createPin') ? 'active' : 'inactive'}`}>
            <span className="step">2</span>
            <span className="title">Crear PIN</span>
          </div>
          <div className={`third step-container ${(this.props.registrationStep === 'registrationSuccess') ? 'active' : 'inactive'}`}>
            <span className="step">3</span>
            <span className="title">Comenzar a usar Strix</span>
          </div>
        </div>
        {this.elementToRender(this.state.registrationStep)}
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  registrationStep: PropTypes.string,
  match: PropTypes.object,
};

export default RegistrationForm;
