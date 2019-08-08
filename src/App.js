import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import AppLayout from './AppLayout';
import NavBar from './components/navbar/navbar';
import ListAll from './components/list-all/list-all';
import CreateGist from './components/create/createGist';
import Login from './components/auth/login';
import Logout from './components/auth/logout';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppLayout>
        <Route path='/login' component={Login} exact />
        <Route path='/logout' component={Logout} exact />
        <Route path='/listall' component={ListAll} exact />
        <Route path='/create' component={CreateGist} exact />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
