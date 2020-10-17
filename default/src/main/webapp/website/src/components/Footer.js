import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { logo, fb, ig, li, gh, yt } from '../images';

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
    margin: '24px 10px 0px 10px',
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
  socials: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  social: {
    width: '50px',
    margin: '5px 0px 5px 0px',
    '&:not(:first-of-type)': {
      marginLeft: '5px',
    },
    '&:not(:last-of-type)': {
      marginRight: '5px',
    },
  },
}));

function Footer(props) {
  const classes = useStyles();
  return (
    <div style={footerStyle}>
      <div className={classes.root}>
        <div className={classes.about}>
          <Typography variant='h6' style={white}>
            About
          </Typography>
          <Link to='/about/me'>
            <Typography variant='body1' style={white}>
              About Me
            </Typography>
          </Link>
          <Link to='/about/website'>
            <Typography variant='body1' style={white}>
              Website
            </Typography>
          </Link>
        </div>
        <div className={classes.about}>
          <Link to='/contact'>
            <Typography variant='h6' style={white}>
              Contact
            </Typography>
          </Link>
        </div>
        <div className={classes.about}>
          <Typography variant='h6' style={white}>
            Connect
          </Typography>

          <div className={classes.socials}>
            <img src={fb} className={classes.social} alt='Facebook' />
            <img src={ig} className={classes.social} alt='Instagram' />
            <img src={li} className={classes.social} alt='LinkedIn' />
            <img src={gh} className={classes.social} alt='GitHub' />
            <img src={yt} className={classes.social} alt='YouTube' />
          </div>
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

const white = {
  color: '#f8f8ff',
};

const footerStyle = {
  backgroundColor: 'black', //#5c5c, #5c5cff, #4dc9b0, #40ad93
};

export default Footer;
