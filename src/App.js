import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import AppLayout from './AppLayout';
import NavBar from './components/navbar/navbar';
import ListAll from './components/list-all/list-all';
import CreateGist from './components/create/createGist';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Gist from './components/gist/gist';
import EditGist from './components/create/editGist';
import StarredGist from './components/starred/starred';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppLayout>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/logout' component={Logout} exact />
          <Route path='/listall' component={ListAll} exact />
          <Route path='/gist/:id' component={Gist} exact />
          <Route path='/create' component={CreateGist} exact />
          <Route path='/gist/current/edit' component={EditGist} exact />
          <Route path='/star-gist' component={StarredGist} exact />
        </Switch>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
