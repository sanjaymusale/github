import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from './App';
import { configureStore } from './store/configure';
import Loader from './components/loader';

const { store, persistor } = configureStore();

const app =
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ;


ReactDOM.render(app, document.getElementById('root'));
