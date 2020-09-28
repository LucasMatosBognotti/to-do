import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Menu from './page/Menu';
import Todo from './page/Todo';
import Sobre from './page/Sobre';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Menu} />
      <Route path="/todo" component={Todo} />
      <Route path="/sobre" component={Sobre} />
    </Switch>
  );
};

export default Routes;
