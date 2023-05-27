import React from 'react';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../../containers/ForgotPasswordForm';
import ForgotPasswordSuccessful from '../ForgotPasswordSuccessful';
import ForgotPasswordError from '../ForgotPasswordError';
import './ForgotPassword.scss';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regStep: '',
    };
  }

  handleRegStep = (step) => {
    this.setState({ regStep: step });
  }

  forgotPasswordStep = () => {
    const username = this.props.match.params.username;
    const token = this.props.match.params.token;

    switch (this.state.regStep) {
      case 'passwordChanged':
        return (<ForgotPasswordSuccessful />);
      case 'error':
        return (<ForgotPasswordError />);
      default:
        return (<ForgotPasswordForm
          regStep={this.handleRegStep}
          token={token}
          username={username}
        />);
    }
  }

  render() {
    return (
      <div className="registration-form-container">
        <h1>Recuperacion de contraseña</h1>
        {this.forgotPasswordStep()}
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  match: PropTypes.object,
};
export default ForgotPassword;
