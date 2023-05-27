import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//El provider envuelve a toda nuestra aplicación y que pueda ser acceder al estado
import { Provider } from 'react-redux';
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);