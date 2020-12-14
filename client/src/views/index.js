import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from './routes.js';

function ProtecredRoute(props) {
  if (props.protected()) {
    return <Route {...props} />;
  } else {
    return <Redirect from={props.path} to="/login" />;
  }
}

function createRoutes() {
  return routes.map((route, key) => {
    if (route.protected)
      return (
        <ProtecredRoute
          protected={route.protected}
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={key}
        />
      );

    return <Route path={route.path} exact={route.exact} component={route.component} key={key} />;
  });
}

export default createRoutes();
