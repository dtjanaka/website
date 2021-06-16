import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { EmailText } from '../Constants';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Title = 'Dylon Tjanaka | Contact';

const useStyles = makeStyles((theme) => ({
  emailBox: {
    marginTop: '-13px',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Contact(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
    handleClick();
  }

  useEffect(() => {
    props.changeHeader(Title);
  });

  window.onload = () => {
    document.getElementById('emailText').textContent = EmailText;
  };

  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div className='content'>
        <br />
        <h1 className='contentTitle'>Contact</h1>
        <hr />
        <br />
        <div className={classes.emailBox}>
          <span id='emailText'></span>
          <IconButton edge='end' onClick={copyEmailToClipboard} color='primary'>
            <FileCopyIcon />
          </IconButton>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              Email copied to clipboard!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}

export default Contact;
