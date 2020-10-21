import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
  logo,
  logo2,
  logo3,
  logotype,
  fb,
  ig,
  li,
  gh,
  yt,
  email,
} from '../images';
import { EmailText } from './Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'black',
  },
  footerBox: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: '0px 12px 0px 12px',
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
  },
  headingBox: {
    display: 'flex',
    flexFlow: 'column',
    margin: '24px 12px 0px 12px',
  },
  email: {
    height: '0.875rem',
  },
  socialsBox: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  social: {
    margin: '10px 10px 0px 0px',
    '&:last-of-type': {
      marginRight: '0px',
    },
  },
  socialIcon: {
    width: '24px',
    display: 'block',
  },
  copyEmailIcon: {
    color: '#f8f8ff',
  },
  emailBox: {
    marginTop: '-13px',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    margin: '24px 12px 0px 12px',
  },
}));

const offWhite = {
  color: '#f8f8ff',
};

function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.footerBox}>
        <div className={classes.headingBox}>
          <Typography variant='h6' style={offWhite}>
            About
          </Typography>
          <Link to='/about/me'>
            <Typography variant='body2' style={offWhite}>
              About Me
            </Typography>
          </Link>
          <Link to='/about/website'>
            <Typography variant='body2' style={offWhite}>
              Website
            </Typography>
          </Link>
        </div>
        <div className={classes.headingBox}>
          <Link to='/contact'>
            <Typography variant='h6' style={offWhite}>
              Contact
            </Typography>
          </Link>
          <div className={classes.emailBox}>
            <img src={email} className={classes.email} alt='Email' />
            <IconButton edge='end'>
              <FileCopyIcon
                onClick={copyEmailToClipboard}
                className={classes.copyEmailIcon}
              />
            </IconButton>
          </div>
        </div>
        <div className={classes.headingBox}>
          <Typography variant='h6' style={offWhite}>
            Connect
          </Typography>
          <div className={classes.socialsBox}>
            <a
              href='https://www.facebook.com/profile.php?id=100014709977810'
              target='_blank'
              className={classes.social}
            >
              <img src={fb} className={classes.socialIcon} alt='Facebook' />
            </a>
            <a
              href='https://www.instagram.com/dylon.tjanaka/'
              target='_blank'
              className={classes.social}
            >
              <img src={ig} className={classes.socialIcon} alt='Instagram' />
            </a>
            <a
              href='https://www.linkedin.com/in/dylon-tjanaka-971508192'
              target='_blank'
              className={classes.social}
            >
              <img src={li} className={classes.socialIcon} alt='LinkedIn' />
            </a>
            <a
              href='https://github.com/dtjanaka/'
              target='_blank'
              className={classes.social}
            >
              <img src={gh} className={classes.socialIcon} alt='GitHub' />
            </a>
            <a
              href='https://www.youtube.com/channel/UCx1tcHdDx4esRDbmDgRIn9Q'
              target='_blank'
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

function copyEmailToClipboard() {
  // create text field
  let copyText = document.createElement('textarea');
  copyText.value = EmailText;
  document.body.appendChild(copyText);

  // select text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // for mobile

  // copy text from text field
  document.execCommand('copy');

  // remove text field
  document.body.removeChild(copyText);

  // alert copy confirmation
  alert('Email copied to clipboard!');
}
