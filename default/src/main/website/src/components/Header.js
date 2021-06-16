import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Modal from '@material-ui/core/Modal';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logo } from '../images';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: '12px',
  },
  title: {
    flexGrow: 1,
  },
  homeIcon: {
    width: '36px',
    marginRight: '24px',
    display: 'block',
  },
  loginLogoutButton: {
    visibility: 'hidden',
  },
  drawerPAL: {
    backgroundColor: '#f8f8ff',
  },
  boxes: {
    width: '250px',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'start',
    alignItems: 'center',
  },
  box: {
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
  },
  modalChild: {
    width: '400px',
    height: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: '-200px',
    marginTop: '-200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
  },
  boxButton: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    // button:hover --> opacity: 0.7 already in App.css
  },
}));

let open420flag = false; // global variable since setting and using state immediately doesn't work

function Header(props) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [buttonNum, setButtonNum] = React.useState(0);
  const [interval420, setInterval420] = React.useState(0);
  const [loginStatus, setLoginStatus] = React.useState('');

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      // what is this for?
      return;
    }

    setDrawerOpen(open);
  };

  function callback420() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month === 3 && day === 20) {
      setModalText('4/20 😎');
    }

    let goalDate;
    if (month > 3 || day > 20) {
      goalDate = new Date(year + 1, 3, 20).getTime();
    } else {
      goalDate = new Date(year, 3, 20).getTime();
    }

    let difference = goalDate - date.getTime();

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let remainder = difference - days * (1000 * 60 * 60 * 24);

    if ((days === 0 && remainder) || (days === 1 && !remainder)) {
      setModalText('1 day until 4/20');
    } else {
      if (!remainder) {
        setModalText(days + ' days until 4/20');
      }
      setModalText(days + 1 + ' days until 4/20');
    }
  }

  function toggleModal(open, num) {
    setModalOpen(open);
    if (open) {
      setButtonNum(num);
    }
    if (num === 420) {
      open420flag = !open420flag;
      if (!open420flag) {
        clearInterval(interval420);
      } else {
        callback420();
        setInterval420(setInterval(callback420, 1000));
      }
    } else {
      setModalText(boxModalContent[num]);
    }
  }

  const location = useLocation().pathname.substring(1);

  window.addEventListener('resize', function () {
    if (window.innerWidth < 600) {
      document.getElementById('headerTitle').innerHTML = 'Dylon Tjanaka';
    } else {
      document.getElementById('headerTitle').innerHTML = props.name;
    }
  });

  async function loginLogout() {
    const result = await getLoginLogoutObject(location);
    const url = result.url;
    window.open(url, '_self');
  }

  async function updateLoginStatus() {
    const result = await getLoginLogoutObject(location);
    if (result.loggedIn) {
      setLoginStatus('Logout');
    } else {
      setLoginStatus('Login');
    }
  }

  async function updateLoginStatusIfActive() {
    if (!document.hidden) {
      await updateLoginStatus();
    }
  }

  // instead of window.addEventListener('load', ...), which fires twice
  window.onload = async () => {
    await updateLoginStatus();
    document.getElementById('loginLogoutButton').style.visibility = 'visible';
    setInterval(updateLoginStatusIfActive, 5000); // set this in here instead of by itself; would fire more than once every interval
  };

  let boxModalContent = [...Array(10000 + 1).keys()];
  boxModalContent[69] = 'Nice';

  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={() => toggleModal(false, buttonNum)}
      >
        <div className={classes.modalChild}>
          <h1>{modalText}</h1>
        </div>
      </Modal>
      <Drawer
        className={classes.drawer}
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)} // why do Drawer onClose and onClick functions have to be as such while onClose and onClick functions for Modal have to be wrapped in anonymous functions?
        classes={{ paperAnchorLeft: classes.drawerPAL }} // pull out rule name
      >
        <div className={classes.boxes}>
          {[...Array(10000 + 1).keys()].slice(1).map((x) => (
            <div className={classes.box} id={'box-' + x}>
              <button
                type='button'
                onClick={() => toggleModal(true, x)}
                className={classes.boxButton}
              >
                {x}
              </button>
            </div>
          ))}
        </div>
      </Drawer>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='secondary'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/home'>
            <img src={logo} className={classes.homeIcon} alt='DT home icon' />
          </Link>
          <Typography variant='h6' className={classes.title} id='headerTitle'>
            {window.innerWidth < 600 ? 'Dylon Tjanaka' : props.name}
          </Typography>
          <Button
            color='secondary'
            onClick={loginLogout}
            className={classes.loginLogoutButton}
            id='loginLogoutButton'
          >
            {loginStatus}
          </Button>
        </Toolbar>
      </AppBar>
      {/*https://material-ui.com/components/app-bar/#fixed-placement*/}
      <Toolbar />
    </div>
  );
}

export default Header;

async function getLoginLogoutObject(page) {
  const url = '/users' + '?page=' + page;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

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
