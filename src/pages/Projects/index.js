import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import List from './List';
import Form from './Form';

export default ({ match }) => {
  const { url } = match;
  return (
    <Switch>
      <Route exact path={`${url}/list`} component={List} />
      <Route path={`${url}/:pid/edit`} component={Form} />
      <Route path={`${url}/create`} component={Form} />
      <Redirect from="*" to={`${url}/list`} />
    </Switch>
  );
};
