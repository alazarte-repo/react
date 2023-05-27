import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import InputValidations from './inputValidations';

const defaultErrors = Object.freeze({
  [InputValidations.Email]: () => 'El campo debe contener un e-mail',
  [InputValidations.Required]: () => 'El campo es obligatorio',
  [InputValidations.MinLength]: length => `El campo debe contener al menos ${length} caracteres`,
  [InputValidations.MaxLength]: length => `El campo debe contener a lo sumo ${length} caracteres`,
  [InputValidations.Numbers]: () => 'El campo sólo debe contener números',
});

class ValidatedInput extends Component {
  constructor(props) {
    super(props);
    const {
      registerToForm,
      unregisterFromForm,
      validations,
      ...filteredProps
    } = props;
    this.state = {
      valid: true,
      errorMessage: '',
      filteredProps,
    };

    this.registerToForm = registerToForm;
    this.unregisterFromForm = unregisterFromForm;
    this.validationsFunctions = {
      [InputValidations.Email]: this._checkEmail.bind(this),
      [InputValidations.Required]: this._checkRequired.bind(this),
      [InputValidations.MinLength]: this._checkMinLength.bind(this),
      [InputValidations.MaxLength]: this._checkMaxLength.bind(this),
      [InputValidations.Numbers]: this._checkIsNumber.bind(this),
    };
  }

  componentDidMount() {
    this.registerToForm(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      registerToForm,
      unregisterFromForm,
      validations,
      ...props
    } = nextProps;
    this.setState({ filteredProps: props });
  }

  componentWillUnmount() {
    this.unregisterFromForm(this);
  }

  validate() {
    /* eslint-disable no-restricted-syntax */
    let validationFunc;
    let errorMessageFunc;
    for (const validation of this.props.validations) {
      validationFunc = this.validationsFunctions[validation.validation];
      if (validation.value != null ? !validationFunc(validation.value) : !validationFunc()) {
        errorMessageFunc = defaultErrors[validation.validation];
        this.setState({
          valid: false,
          errorMessage: validation.value != null
            ? errorMessageFunc(validation.value)
            : errorMessageFunc(),
        });
        return false;
      }
    }
    this.setState({ valid: true, errorMessage: '' });
    return true;
  }

  _checkRequired() {
    return this.props.defaultValue !== '' && this.props.defaultValue != null;
  }

  _checkEmail() {
    const emailRexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRexp.test(String(this.props.defaultValue).toLowerCase());
  }

  _checkMaxLength(length) {
    return this.props.defaultValue.length <= length;
  }

  _checkMinLength(length) {
    return this.props.defaultValue.length >= length;
  }

  _checkIsNumber() {
    const numberRexp = /^[0-9]*$/;
    return numberRexp.test(this.props.defaultValue);
  }

  // TODO: When updating to react 16 use Fragments!!
  render() {
    return (
      <div>
        <FormControl
          componentClass="input"
          {...this.state.filteredProps}
        />
        {
          !this.state.valid &&
          <div style={{ color: 'red' }}>
            { this.state.errorMessage }
          </div>
        }
      </div>
    );
  }
}

ValidatedInput.displayName = 'ValidatedInput';

ValidatedInput.propTypes = {
  registerToForm: PropTypes.func,
  unregisterFromForm: PropTypes.func,
  defaultValue: PropTypes.string,
  validations: PropTypes.arrayOf(String),
};

ValidatedInput.defaultProps = {
  validations: [],
};

export default ValidatedInput;
