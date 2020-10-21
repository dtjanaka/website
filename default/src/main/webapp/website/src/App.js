import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  palette: {
    primary: { main: '#000000', contrastText: '#f8f8ff' },
    secondary: { main: '#f8f8ff', contrastText: '#000000' },
  },
});

const useStyles = makeStyles((theme) => ({
  App: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  contentBox: {
    flex: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.App}>
          <Header name='Home' />
          <div className={classes.contentBox}>
            <Switch>
              <Route exact path='/comments' component={Comments} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/settings' component={Settings} />

              <Redirect from='/home' to='/' />
              <Route path='/' component={StaticContent} />
            </Switch>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
