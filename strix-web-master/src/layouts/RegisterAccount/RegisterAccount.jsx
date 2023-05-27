import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import AlternativeLayout from '../AlternativeLayout';
import Stepper from '../../components/Stepper';
import Spinner from '../../components/Spinner';
import { history } from '../../store';
import ValidatedForm, {
  ValidatedInput,
  ValidatedSelect,
  InputValidations as Iv,
} from '../../components/ValidatedForm';
import './RegisterAccount.scss';

const countryValues = Object.freeze([
  {
    label: 'Seleccione un país',
    value: '',
  },
  {
    label: 'Argentina',
    value: 'AR',
  },
  {
    label: 'Uruguay',
    value: 'UY',
  },
  {
    label: 'Chile',
    value: 'CL',
  },
]);

class RegisterAccount extends Component {
  static goToLogin() {
    history.push('/login');
  }

  constructor(props) {
    super(props);
    this.state = {
      accountInformation: {
        email: '',
        password: '',
        name: '',
        lastName: '',
        pin: '',
        country: countryValues[0].value,
      },
    };
    this.formRef = null;

    // Bindings
    this.nextStep = this.nextStep.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  get loading() {
    return this.props.checkingUsername || this.props.creatingAccount;
  }

  nextStep() {
    if (this.formRef.validateForm()) {
      if (this.props.step < 2) {
        this.props.checkUsername(this.state.accountInformation.email);
      } else {
        this._registerAccount();
      }
    }
  }

  handleForm(event) {
    this.setState({
      accountInformation: {
        ...this.state.accountInformation,
        [event.target.name]: event.target.value,
      },
    });
  }

  _registerAccount() {
    const accountInfo = this.state.accountInformation;
    const accountData = {
      account: {
        name: `${accountInfo.name} ${accountInfo.lastName}`,
        address: {
          country: accountInfo.country,
        },
      },
      user: {
        username: accountInfo.email,
        first_name: accountInfo.name,
        last_name: accountInfo.lastName,
        password: accountInfo.password,
        security_pin: accountInfo.pin,
      },
    };
    this.props.createAccount(accountData);
  }

  render() {
    const accountInformation = this.state.accountInformation;
    return (
      <AlternativeLayout>
        <div className="register-account-layout">
          <div className="register-account-forms">
            <h3> Registro de nuevo usuario </h3>
            <Stepper
              steps={['Información básica', 'Complete su perfil']}
              currentStep={this.props.step}
            />
            <ValidatedForm ref={(node) => { this.formRef = node; }}>
              <div className="content">
                {
                  this.props.step === 1 &&
                  <div className="step-one">
                    <label htmlFor="email"> Email </label>
                    <ValidatedInput
                      name="email"
                      autoComplete="username"
                      componentClass="input"
                      type="email"
                      validations={[
                        { validation: Iv.Required },
                        { validation: Iv.Email },
                      ]}
                      defaultValue={accountInformation.email}
                      onChange={this.handleForm}
                      disabled={this.loading}
                    />

                    <label htmlFor="passsword"> Contraseña </label>
                    <ValidatedInput
                      name="password"
                      autoComplete="current-password"
                      componentClass="input"
                      type="password"
                      validations={[{ validation: Iv.Required }]}
                      defaultValue={accountInformation.password}
                      onChange={this.handleForm}
                      disabled={this.loading}
                    />

                    <span className="already-registered">
                      Ya estás registrado?
                      <a onClick={RegisterAccount.goToLogin}> Iniciar sesión </a>
                    </span>
                  </div>
                }
                {
                  this.props.step === 2 &&
                  <div className="step-two">
                    <Row>
                      <Col md={6}>
                        <label htmlFor="name"> Nombre </label>
                        <ValidatedInput
                          name="name"
                          autoComplete="given-name"
                          componentClass="input"
                          type="text"
                          validations={[{ validation: Iv.Required }]}
                          defaultValue={accountInformation.name}
                          onChange={this.handleForm}
                          disabled={this.loading}
                        />
                      </Col>

                      <Col md={6}>
                        <label htmlFor="lastName"> Apellido </label>
                        <ValidatedInput
                          name="lastName"
                          autoComplete="family-name"
                          componentClass="input"
                          type="text"
                          validations={[{ validation: Iv.Required }]}
                          defaultValue={accountInformation.lastName}
                          onChange={this.handleForm}
                          disabled={this.loading}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <label htmlFor="country"> Seleccione su pais </label>
                        <ValidatedSelect
                          name="country"
                          autoComplete="country-name"
                          componentClass="select"
                          isRequired
                          defaultValue={accountInformation.country}
                          onChange={this.handleForm}
                          disabled={this.loading}
                        >
                          {
                            countryValues.map(country => (
                              <option value={country.value} key={country.value}>
                                { country.label }
                              </option>
                            ))
                          }
                        </ValidatedSelect>
                      </Col>

                      <Col md={6}>
                        <label htmlFor="pin"> PIN de seguridad (4 dígitos) </label>
                        <ValidatedInput
                          name="pin"
                          autoComplete="security-pin"
                          componentClass="input"
                          type="password"
                          disabled={this.loading}
                          validations={[
                            { validation: Iv.Required },
                            { validation: Iv.MaxLength, value: 4 },
                            { validation: Iv.MinLength, value: 4 },
                            { validation: Iv.Numbers },
                          ]}
                          defaultValue={accountInformation.pin}
                          onChange={this.handleForm}
                          maxLength={4}
                        />
                      </Col>
                    </Row>
                    <span className="pin-text">
                      El pin de seguridad se requerirá para utilizar algunas de las
                      funcionalidades de seguridad de la aplicación
                    </span>
                  </div>
                }
                {
                  this.props.error &&
                  <div className="alert alert-danger"> { this.props.error } </div>
                }
              </div>
              <div className="footer">
                <Button
                  bsClass="btn btn-prev"
                  onClick={this.props.previousStep}
                  disabled={this.props.step === 1 || this.loading}
                >
                  Anterior
                </Button>
                <Button
                  bsClass="btn btn-primary btn-next"
                  onClick={this.nextStep}
                  disabled={this.loading}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {
                      this.loading &&
                      <Spinner
                        style={{ marginRight: '10px' }}
                        color="white"
                        fontSize="14px"
                        margin="0 3px 0 0"
                      />
                    }
                    { this.props.step === 2 ? 'Finalizar' : 'Continuar' }
                  </div>
                </Button>
              </div>
            </ValidatedForm>
          </div>
        </div>
      </AlternativeLayout>
    );
  }
}

RegisterAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  checkUsername: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  checkingUsername: PropTypes.bool,
  creatingAccount: PropTypes.bool,
  error: PropTypes.string,
  step: PropTypes.number,
};

export default RegisterAccount;
