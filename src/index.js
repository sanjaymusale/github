import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css'
import App from './App';
import { Provider } from 'react-redux'
import { configureStore } from '../src/store/configure'
import { PersistGate } from 'redux-persist/es/integration/react';
import Loader from './components/loader'
const { store, persistor } = configureStore()

store.subscribe(() => {
  console.log(store.getState())
})

const app = (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>
)


ReactDOM.render(app, document.getElementById('root'));


