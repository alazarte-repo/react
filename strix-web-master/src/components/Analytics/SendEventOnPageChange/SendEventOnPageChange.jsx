import React, { Component } from 'react';
import { sendEvent } from '../../../actions/analytics';
import store from '../../../store';

/**
 * High order component for sending a new event when URL path changes
 * on navigation bar. It must be used in the top level component that
 * will be mounted as result of the url change.
 *
 * @param event Event to be sent.
 * @param WrappedComponent Component to be wrapped.
 */
const SendEventOnPageChange = (event, WrappedComponent) => (
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        url: null,
      };
      this.action = event.action;
      this.category = event.category;
    }

    componentWillReceiveProps() {
      if (this.state.url !== window.location.pathname) {
        store.dispatch(sendEvent(this.action, this.category));
      }
      this.setState({ url: window.location.pathname });
    }

    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }
);

export default SendEventOnPageChange;
