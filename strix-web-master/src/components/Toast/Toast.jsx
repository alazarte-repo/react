import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

class ToastNotification extends Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.error.status !== this.props.error.status ||
      nextProps.success.status !== this.props.success.status);
  }

  toastId = null;
  render() {
    const options = {
      onOpen: this.props.resetActionStatus,
      position: toast.POSITION.BOTTOM_RIGHT,
    };
    if (this.props.error.status) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error(
          this.props.error.message,
          Object.assign(options, { autoClose: false }),
        );
      }
    }
    if (this.props.success.status) {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.success(this.props.success.message, options);
      }
    }
    return <ToastContainer />;
  }
}

ToastNotification.propTypes = {
  success: PropTypes.object,
  error: PropTypes.object,
  resetActionStatus: PropTypes.func,
};
export default ToastNotification;
