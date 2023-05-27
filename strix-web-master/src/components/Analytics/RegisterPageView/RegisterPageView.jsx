import React, { Component } from 'react';
import ReactGA from 'react-ga';

/**
 * High order component for sending a new pageview when URL path changes
 * on navigation bar. It must be used in the top level component that will
 * be mounted as result of the url change.
 */
function RegisterPageView(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        url: null,
      };
    }

    componentWillReceiveProps() {
      if (this.state.url !== window.location.pathname) {
        ReactGA.pageview(window.location.pathname);
      }
      this.setState({ url: window.location.pathname });
    }

    render() {
      return (<WrappedComponent {...this.props} />);
    }
  };
}

export default RegisterPageView;
