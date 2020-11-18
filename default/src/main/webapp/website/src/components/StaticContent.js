import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Robotics from './static/Robotics';
import Printing from './static/Printing';
import Cubing from './static/Cubing';
import Micromouse from './static/Micromouse';
import Misc from './static/Misc';
import Home from './static/Home';
import Sitemap from './static/Sitemap';
import Privacy from './static/Privacy';
import Contact from './static/Contact';

function StaticContent() {
  return (
    <Switch>
      <Route exact path='/robotics' component={Robotics} />
      <Route exact path='/printing' component={Printing} />
      <Route exact path='/cubing' component={Cubing} />
      <Route exact path='/micromouse' component={Micromouse} />
      <Route exact path='/misc' component={Misc} />
      <Route exact path='/sitemap' component={Sitemap} />
      <Route exact path='/privacy-policy' component={Privacy} />
      <Route exact path='/contact' component={Contact} />

      {/*<Route exact path='/about' component={About} />
      <Route exact path='/about/me' component={AboutMe} />
      <Route exact path='/about/website' component={AboutWebsite} />*/}

      <Route exact path='/' component={Home} />
    </Switch>
  );
}

export default StaticContent;
