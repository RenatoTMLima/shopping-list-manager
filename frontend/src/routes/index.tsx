import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '../pages/Home'
import { Products } from '../pages/Products'

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/products' component={Products} />
  </Switch>
);

export default Routes;
