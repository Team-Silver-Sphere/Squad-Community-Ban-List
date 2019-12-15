import React from 'react';
import { Route } from 'react-router-dom';

import routes from './routes';

function createRoutes() {
  return routes.map((route, key) => (
    <Route
      path={route.path}
      exact={route.exact}
      component={route.component}
      key={key}
    />
  ));
}

export default createRoutes();
