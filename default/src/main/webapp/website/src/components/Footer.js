import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
  },
  about: {
    display: 'flex',
    flexFlow: 'column',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.about}>
        <Typography variant='h6'>About</Typography>
        <Typography variant='body1'>Dylon</Typography>
        <Typography variant='body1'>Website</Typography>
      </div>
      <div className={classes.logo}>
        <Link to='/'>Hi</Link>
      </div>
    </div>
  );
}

const headerStyle = {
  backgroundColor: '#40ad93', //#5c5c, #5c5cff, #4dc9b0, #40ad93
};

export default Footer;
