import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './layouts/Login';
import NotFound from './layouts/NotFound';
import DashboardLayout from './layouts/DashboardLayout';
import ProfileLayout from './layouts/ProfileLayout';
import ConfigurationLayout from './layouts/ConfigurationLayout';
import ForgotPasswordLayout from './layouts/ForgotPasswordLayout';
import FirstLoginLayout from './layouts/FirstLoginLayout';
import NotificationsLayout from './layouts/NotificationsLayout';
import RegisterAccount from './layouts/RegisterAccount';
import VerifyUsername from './layouts/VerifyUsername';
import GetApp from './layouts/GetApp';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('isAuthenticated') === 'true' ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
        }}
        />
      )
    )}
  />
);

const LoggedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('isAuthenticated') === 'true' ? (
        <Redirect to={{
          pathname: '/dashboard',
        }}
        />
      ) : (
        <Component {...props} />
      )
    )}
  />
);


export default () => (
  <Switch>
    <LoggedRoute path="/" exact component={Login} />
    <LoggedRoute path="/login" component={Login} />
    <PrivateRoute path="/dashboard" component={DashboardLayout} />
    <PrivateRoute path="/notifications" component={NotificationsLayout} />
    <PrivateRoute path="/configuration" component={ConfigurationLayout} />
    <PrivateRoute path="/profile" component={ProfileLayout} />
    <PrivateRoute path="/mydevices" component={ProfileLayout} />
    <Route path="/register/:username/:token" component={FirstLoginLayout} />
    <Route path="/resetpassword/:username/:token" component={ForgotPasswordLayout} />
    <Route path="/register/new" component={RegisterAccount} />
    <Route path="/verify/:username/:token" component={VerifyUsername} />
    <Route path="/get" component={GetApp} />
    <Route component={NotFound} />
  </Switch>
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

LoggedRoute.propTypes = {
  component: PropTypes.func,
};

