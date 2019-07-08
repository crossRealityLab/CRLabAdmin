import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import List from './List';
import Edit from './Edit';

export default ({ match }) => {
  const { url } = match;
  return (
    <Switch>
      <Route exact path={`${url}/list`} component={List} />
      <Route path={`${url}/:pid/edit`} component={Edit} />
      <Redirect from="*" to={`${url}/list`} />
    </Switch>
  );
};

