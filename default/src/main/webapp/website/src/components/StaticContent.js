import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Robotics from './static/Robotics';
import Printing from './static/Printing';
import Cubing from './static/Cubing';

function StaticContent() {
  return (
    <Router>
      <Switch>
        <Route exact path='/robotics' component={Robotics} />
        <Route exact path='/printing' component={Printing} />
        <Route exact path='/cubing' component={Cubing} />
      </Switch>
    </Router>
  );
}

export default StaticContent;
