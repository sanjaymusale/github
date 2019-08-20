import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from './components/loader';
import AppLayout from './AppLayout';
import NavBar from './components/navbar/navbar';

const AllGist = lazy(() => import('./components/list-all/gists'));
const CreateGist = lazy(() => import('./components/create/createGist'));
const Login = lazy(() => import('./components/auth/login'));
const Logout = lazy(() => import('./components/auth/logout'));
const Gist = lazy(() => import('./components/gist/gist'));
const EditGist = lazy(() => import('./components/create/editGist'));
const Starred = lazy(() => import('./components/list-all/starred'));
const Home = lazy(() => import('./home'));
const LoadMoreGist = lazy(() => import('./components/list-all/public'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} exact />
            <Route path="/listall" component={AllGist} exact />
            <Route path="/gist/:id" component={Gist} exact />
            <Route path="/create" component={CreateGist} exact />
            <Route path="/gist/current/edit" component={EditGist} exact />
            <Route path="/star-gist" component={Starred} exact />
            <Route path="/public-gist/:id" component={LoadMoreGist} exact />
          </Switch>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
