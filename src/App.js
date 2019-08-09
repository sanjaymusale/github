import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loading from '../src/components/loader'
import AppLayout from './AppLayout';
import NavBar from './components/navbar/navbar';
const ListAll = lazy(() => import('./components/list-all/list-all'))
const CreateGist = lazy(() => import('./components/create/createGist'))
const Login = lazy(() => import('./components/auth/login'));
const Logout = lazy(() => import('./components/auth/logout'))
const Gist = lazy(() => import('./components/gist/gist'))
const EditGist = lazy(() => import('./components/create/editGist'));
const Starred = lazy(() => import('./components/starred/starred'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path='/login' component={Login} exact />
            <Route path='/logout' component={Logout} exact />
            <Route path='/listall' component={ListAll} exact />
            <Route path='/gist/:id' component={Gist} exact />
            <Route path='/create' component={CreateGist} exact />
            <Route path='/gist/current/edit' component={EditGist} exact />
            <Route path='/star-gist' component={Starred} exact />
          </Switch>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
