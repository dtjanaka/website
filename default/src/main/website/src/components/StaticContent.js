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

function StaticContent(props) {
  const changeHeader = (title) => props.changeHeader(title);
  return (
    // prettier-ignore
    <Switch>
      <Route exact path='/robotics'       render={(props) => <Robotics {...props} changeHeader={changeHeader} />} />
      <Route exact path='/printing'       render={(props) => <Printing {...props} changeHeader={changeHeader} />} />
      <Route exact path='/cubing'         render={(props) => <Cubing {...props} changeHeader={changeHeader} />} />
      <Route exact path='/micromouse'     render={(props) => <Micromouse {...props} changeHeader={changeHeader} />} />
      <Route exact path='/misc'           render={(props) => <Misc {...props} changeHeader={changeHeader} />} />
      <Route exact path='/sitemap'        render={(props) => <Sitemap {...props} changeHeader={changeHeader} />} />
      <Route exact path='/privacy-policy' render={(props) => <Privacy {...props} changeHeader={changeHeader} />}/>
      <Route exact path='/contact'        render={(props) => <Contact {...props} changeHeader={changeHeader} />}/>

      {/*<Route exact path='/about' component={About} />
      <Route exact path='/about/me' component={AboutMe} />
      <Route exact path='/about/website' component={AboutWebsite} />*/}

      <Route exact path='/'               render={(props) => <Home {...props} changeHeader={changeHeader} />}/>
    </Switch>
  );
}

export default StaticContent;
