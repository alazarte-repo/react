import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ValidatedForm extends Component {
  constructor(props) {
    super(props);
    this.validationControls = [];
    this.registerInput = this.registerInput.bind(this);
    this.unregisterInput = this.unregisterInput.bind(this);
  }

  getAllvalidationControls(children) {
    if (!Array.isArray(children)) {
      return children;
    }

    const newChildren = React.Children.map(children, (child) => {
      if (child != null) {
        if (typeof child.type === 'function'
          && (child.type.displayName === 'ValidatedInput'
          || child.type.displayName === 'ValidatedSelect')) {
          return React.cloneElement(
            child,
            { ...child.props,
              registerToForm: this.registerInput,
              unregisterFromForm: this.unregisterInput,
            },
          );
        } else if (child.props != null && child.props.children != null) {
          return React.cloneElement(
            child,
            child.props,
            this.getAllvalidationControls(child.props.children),
          );
        }
        return child;
      }
      return child;
    });

    return newChildren;
  }

  registerInput(input) {
    this.validationControls[input.props.name] = input;
  }

  unregisterInput(input) {
    delete this.validationControls[input.props.name];
  }

  validateForm() {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-unused-vars */
    let formIsValid = true;
    for (const [key, value] of Object.entries(this.validationControls)) {
      formIsValid = value.validate() && formIsValid;
    }

    return formIsValid;
  }

  render() {
    return (
      <form className={this.props.className}>
        { this.getAllvalidationControls(this.props.children) }
      </form>
    );
  }
}

ValidatedForm.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
};

export default ValidatedForm;
