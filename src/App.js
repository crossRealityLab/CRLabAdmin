import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './providers/Auth';

import Main from './pages/Main';
import Login from './pages/Login';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        isLoading ? (
          <div style={{ margin: '16px 0 0 16px' }}> Loading ... </div>
        ) : !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" component={Main} />
    </Switch>
  );
};
