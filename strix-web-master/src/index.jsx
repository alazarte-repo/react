import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import ReactGA from 'react-ga';
import store, { history } from './store';
import Routes from './routes';
import { googleAnalyticsTrackId, googleTagManagerId } from './config';
import './styles/App.scss';

// Initialize analytics and google tags
(function InitializeAnalytics() {
  // console.log('Initializing analytics...');
  TagManager.initialize({ gtmId: googleTagManagerId });
  ReactGA.initialize(googleAnalyticsTrackId);
}());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('app'),
);
