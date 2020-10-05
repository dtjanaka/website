import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'top',
    margin: '0px 24px 0px 24px',
  },
  about: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: '24px',
  },
  logoBox: {
    width: 'auto',
    height: 'auto',
  },
  logo: {
    width: '115px',
    height: 'auto',
    display: 'block',
    margin: '24px 0px 24px 24px',
  },
}));

function Footer(props) {
  const classes = useStyles();
  return (
    <div style={headerStyle}>
      <div className={classes.root}>
        <div className={classes.about}>
          <Typography variant='h6'>About</Typography>
          <Link to='/'>
            <Typography variant='body1'>Dylon</Typography>
          </Link>
          <Link to='/about/website'>
            <Typography variant='body1'>Website</Typography>
          </Link>
        </div>
        <div className={classes.logoBox}>
          <Link to='/'>
            <img src={logo} className={classes.logo} alt='DT logo' />
          </Link>
        </div>
      </div>
    </div>
  );
}

const headerStyle = {
  backgroundColor: '#40ad93', //#5c5c, #5c5cff, #4dc9b0, #40ad93
};

export default Footer;
