import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './components/Footer';
import Comments from './components/Comments';
import Profile from './components/Profile';
import Settings from './components/Settings';
import StaticContent from './components/StaticContent';
import Header from './components/Header';

// TODO: Helmet causes warning:
// "Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code."
// try react-helmet-async

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
  // for keeping Footer fixed at bottom
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

  const [headerTitle, setHeaderTitle] = React.useState('Dylon Tjanaka');

  const changeHeaderTitle = (title) => {
    setHeaderTitle(title);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.App}>
          <Header name={headerTitle} />
          <div className={classes.contentBox}>
            <Switch>
              {/*https://learnwithparam.com/blog/how-to-pass-props-in-react-router*/}
              <Route
                exact
                path='/comments'
                render={(props) => (
                  <Comments {...props} changeHeader={changeHeaderTitle} />
                )}
              />
              <Route
                exact
                path='/profile'
                render={(props) => (
                  <Profile {...props} changeHeader={changeHeaderTitle} />
                )}
              />
              <Route
                exact
                path='/settings'
                render={(props) => (
                  <Settings {...props} changeHeader={changeHeaderTitle} />
                )}
              />

              <Redirect from='/home' to='/' />
              <Route
                path='/'
                render={(props) => (
                  <StaticContent {...props} changeHeader={changeHeaderTitle} />
                )}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
