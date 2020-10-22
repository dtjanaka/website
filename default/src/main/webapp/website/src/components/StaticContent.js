import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Robotics from './static/Robotics';
import Printing from './static/Printing';
import Cubing from './static/Cubing';
import Micromouse from './static/Micromouse';
import Home from './static/Home';

function StaticContent() {
  return (
    <Switch>
      <Route exact path='/robotics' component={Robotics} />
      <Route exact path='/printing' component={Printing} />
      <Route exact path='/cubing' component={Cubing} />
      <Route exact path='/micromouse' component={Micromouse} />
      <Route exact path='/' component={Home} />
    </Switch>
  );
}

export default StaticContent;
