import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Comments from './components/Comments';
import Profile from './components/Profile';
import Settings from './components/Settings';
import StaticContent from './components/StaticContent';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header name='Home' />
        <Switch>
          <Route exact path='/comments' component={Comments} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/settings' component={Settings} />

          <Redirect from='/home' to='/' />
          <Route path='/' component={StaticContent} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
