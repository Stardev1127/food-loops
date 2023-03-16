import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import { StartPage } from '../pages';
import ProtectedRoutes from './ProtectedRoutes';
import RootComponent from '../RootComponent';

function Routes() {
  return (
    <BrowserRouter>
      <App>
        <RootComponent>
          <Switch>
            <Route path="/" component={StartPage} exact />
            <ProtectedRoutes />
          </Switch>
        </RootComponent>
      </App>
    </BrowserRouter>
  );
}

export default Routes;
