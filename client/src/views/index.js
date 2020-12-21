import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from './routes.js';

import Auth from '../utils/auth';

export default routes.map(({ component: Component, ...route }, key) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={(props) => {
        return route.login && !Auth.isLoggedIn ? (
          <Redirect from={route.path} to="/login" />
        ) : (
          <Component {...props} />
        );
      }}
      key={key}
    />
  );
});
