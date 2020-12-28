import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
// prettier-ignore
import {
  logotype,
  fb, ig, li, gh, yt,
} from '../images';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'black',
  },
  footerHeaderBox: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '0px',
    marginBottom: '0px',
    width: '40%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    '@media only screen and (max-width: 1000px)': {
      width: '75%',
    },

    '@media only screen and (max-width: 600px)': {
      width: '100%',
    },
  },
  footerFooterBox: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '24px 12px 0px 12px',
    paddingBottom: '24px',
  },
  footerFooterItem: {
    margin: '0px 12px 0px 12px',
    display: 'block',
    textAlign: 'center',
  },
  headingBox: {
    display: 'flex',
    flexFlow: 'column',
    margin: '24px 0px 0px 0px',

    '@media only screen and (max-width: 600px)': {
      margin: '24px 24px 0px 24px',
    },
  },
  socialsBox: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  social: {
    margin: '4px 12px 0px 0px',
    '&:last-of-type': {
      marginRight: '0px',
    },
  },
  socialIcon: {
    width: '24px',
    display: 'block',
  },
  logotypeBox: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logotype: {
    width: '200px',
    height: 'auto',
    display: 'block',
    margin: '24px 24px 0px 24px',
  },
}));

const offWhite = {
  color: '#f8f8ff',
};

function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.footerHeaderBox}>
        <div className={classes.headingBox}>
          <Typography variant='h6' style={offWhite}>
            Quick Links
          </Typography>
          <Link to='/about'>
            <Typography variant='body2' style={offWhite}>
              About Website
            </Typography>
          </Link>
          <Link to='/contact'>
            <Typography variant='body2' style={offWhite}>
              Contact
            </Typography>
          </Link>
        </div>
        <div className={classes.headingBox}>
          <Typography variant='h6' style={offWhite}>
            Connect
          </Typography>
          <div className={classes.socialsBox}>
            <a
              href='https://www.facebook.com/profile.php?id=100014709977810'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.social}
            >
              <img src={fb} className={classes.socialIcon} alt='Facebook' />
            </a>
            <a
              href='https://www.instagram.com/dylon.tjanaka/'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.social}
            >
              <img src={ig} className={classes.socialIcon} alt='Instagram' />
            </a>
            <a
              href='https://www.linkedin.com/in/dylon-tjanaka-971508192'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.social}
            >
              <img src={li} className={classes.socialIcon} alt='LinkedIn' />
            </a>
            <a
              href='https://github.com/dtjanaka/'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.social}
            >
              <img src={gh} className={classes.socialIcon} alt='GitHub' />
            </a>
            <a
              href='https://www.youtube.com/channel/UCx1tcHdDx4esRDbmDgRIn9Q'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.social}
            >
              <img src={yt} className={classes.socialIcon} alt='YouTube' />
            </a>
          </div>
        </div>
      </div>
      <div className={classes.logotypeBox}>
        <Link to='/'>
          <img
            src={logotype}
            className={classes.logotype}
            alt='Dylon Tjanaka logotype'
          />
        </Link>
      </div>
      <div className={classes.footerFooterBox}>
        <Link to='/privacy-policy'>
          <Typography
            variant='caption'
            style={offWhite}
            className={classes.footerFooterItem}
          >
            Privacy Policy
          </Typography>
        </Link>
        <Link to='/sitemap'>
          <Typography
            variant='caption'
            style={offWhite}
            className={classes.footerFooterItem}
          >
            Sitemap
          </Typography>
        </Link>
        <Typography
          variant='caption'
          style={offWhite}
          className={classes.footerFooterItem}
        >
          © 2020 Dylon Tjanaka. All rights reserved.
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
