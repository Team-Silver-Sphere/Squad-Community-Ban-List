import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from './routes';

import GoogleAnalytics from 'react-ga';

function withTracker(WrappedComponent, options = {}) {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends React.Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}

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
          component={withTracker(route.component)}
          key={key}
        />
      );

    return (
      <Route
        path={route.path}
        exact={route.exact}
        component={withTracker(route.component)}
        key={key}
      />
    );
  });
}

export default createRoutes();
