import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

export default ({ routePath, endpoint, routes }) => {
  return (
    <Switch>
      {routes.map(({ path, routeOptions, component, props }) => {
        const Component = component;
        return (
          <Route
            key={path}
            path={`${routePath}${path}`}
            render={() => (
              <Component routePath={routePath} endpoint={endpoint} {...props} />
            )}
            {...routeOptions}
          />
        );
      })}
      <Redirect from="*" to={`${routePath}${routes[0].path}`} />
    </Switch>
  );
};
