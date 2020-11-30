import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logo3 } from '../images';

// TODO: how to pass function to child and use that to change parent state?

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: '12px',
  },
  title: {
    flexGrow: 1,
    '@media only screen and (max-width: 400px)': {
      fontSize: '0.75rem',
    },
  },
  homeIcon: {
    width: '36px',
    marginRight: '24px',
    display: 'block',
  },
}));

function Header(props) {
  const classes = useStyles();

  const [state, setState] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='secondary'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Link to='/home'>
            <img src={logo3} className={classes.homeIcon} alt='DT home icon' />
          </Link>
          <Typography variant='h6' className={classes.title}>
            {props.name}
          </Typography>
          <Button color='secondary' onClick={login}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/*https://material-ui.com/components/app-bar/#fixed-placement*/}
      <Toolbar />
    </div>
  );
}

export default Header;

/*
async function loggedIn(page) {
  const url = '/users' + '?page=' + page;
  const response = await fetch(url);
  const result = await response.json();
  if (result.loggedIn) {
    result.url
  } else {
    result.url
  }
}*/

function login() {}

/**
 * Runs when the body of a login-restricted page loads.
 * Either displays login button or full page and logout button.
 *
 * @param page  the page the function is called from
 */
/*async function onloadPage(page) {
  const url = '/users' + '?page=' + page + '.html';
  const response = await fetch(url);
  const result = await response.json();
  if (result.loggedIn) {
    if (result.registered) {
      document.getElementById('content-logged-in').style.display = 'initial';
      document.getElementById('gatekeeper').innerHTML = '';
      document
        .getElementById('gatekeeper')
        .appendChild(createLoginLogout(true, result.url));
      if (page === 'comments') {
        document.getElementById('commenting-as').innerHTML =
          'Commenting as <a class="username-link" href="javascript:void(0);" onclick="filterUsername(\'' +
          result.username +
          '\')">' +
          result.username +
          '</a>:';
        document.getElementById(
          'single-username'
        ).value = document.getElementById('delete-username').value = '';
        updateComments(false);
        if (result.isAdmin) {
          document.getElementById('delete-all').value = 'true';
          document.getElementById('delete-comment-div').style.display =
            'initial';
        }
      } else if (page === 'profile') {
        document.getElementById('activity-header').innerText =
          'Activity for ' + result.username;
        updateComments(true);
      }
    } else {
      document
        .getElementById('gatekeeper')
        .appendChild(createLoginLogout(true, result.url));
      document.getElementById('register-div').style.display = 'initial';
    }
  } else {
    document
      .getElementById('gatekeeper')
      .appendChild(createLoginLogout(false, result.url));
  }
}*/
