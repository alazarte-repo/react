import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ValidatedSelect extends Component {
  constructor(props) {
    super(props);
    const {
      registerToForm,
      unregisterFromForm,
      isRequired,
      ...filteredProps
    } = props;
    this.state = {
      valid: true,
      errorMessage: '',
      filteredProps,
    };

    this.registerToForm = registerToForm;
    this.unregisterFromForm = unregisterFromForm;
  }

  componentDidMount() {
    this.registerToForm(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      registerToForm,
      unregisterFromForm,
      isRequired,
      ...props
    } = nextProps;
    this.setState({ filteredProps: props });
  }

  componentWillUnmount() {
    this.unregisterFromForm(this);
  }

  validate() {
    const isValid = this.props.isRequired ? this._checkRequired() : true;
    this.setState({
      valid: isValid,
      errorMessage: isValid ? '' : 'Debe seleccionar una opcion',
    });
    return isValid;
  }

  _checkRequired() {
    return this.props.defaultValue !== '' && this.props.defaultValue != null;
  }

  // TODO: When updating to react 16 use Fragments!!
  render() {
    return (
      <div>
        <FormControl
          componentClass="select"
          {...this.state.filteredProps}
        >
          { this.props.children }
        </FormControl>
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

ValidatedSelect.displayName = 'ValidatedSelect';

ValidatedSelect.propTypes = {
  registerToForm: PropTypes.func,
  unregisterFromForm: PropTypes.func,
  defaultValue: PropTypes.string,
  isRequired: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default ValidatedSelect;
