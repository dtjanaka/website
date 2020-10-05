import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Comments from './components/Comments';
import Profile from './components/Profile';
import Settings from './components/Settings';
import StaticContent from './components/StaticContent';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <Header name='Home' />
          <Switch>
            <Route exact path='/comments' component={Comments} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/settings' component={Settings} />

            <Redirect from='/home' to='/' />
            <Route path='/' component={StaticContent} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
