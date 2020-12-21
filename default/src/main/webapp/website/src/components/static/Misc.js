import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { GrtCoordinates } from '../Constants';
import { map1, map2, map3 } from '../../images';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Title = 'Dylon Tjanaka | Everything Else';

const useStyles = makeStyles((theme) => ({
  respStrava: {
    display: 'table',
    width: '100%',
    height: '160px',
  },
  map270: {
    display: 'block',
    width: '100%',
  },
  markerImg: {
    display: 'block',
    width: '100%',
  },
  markerCaption: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  map: {
    height: '650px',
    width: '100%',
  },
  dialogTitleDiv: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogCloseButton: {
    marginRight: '8px',
  },
}));

function MarkerDialog(props) {
  const { index, open, onClose } = props;
  const imgs = [map1, map2, map3];
  const titles = ['Start of trail', 'River Oaks Bridge', 'Near SJC'];
  const text = [
    'Me at the start of the trail! I ride here frequently.' +
      'The bike is a white Poseidon Expressway-SXL, a flat bar ' +
      'road bike with fixed gears (46T/16T gear ratio), ' +
      'a 6061 aluminum frame, and 700x25mm tires.',
    'River Oaks Bridge across the Guadalupe River ' +
      'connecting the lower and upper trails.',
    'The trail passes right next to Mineta San Jose ' +
      'International Airport!',
  ];
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'xs'}>
      <div className={classes.dialogTitleDiv}>
        <DialogTitle>{titles[index]}</DialogTitle>
        <IconButton
          aria-label='close'
          className={classes.dialogCloseButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <img
        src={imgs[index]}
        alt={titles[index]}
        className={classes.markerImg}
      />
      <br />
      <p className={classes.markerCaption}>{text[index]}</p>
      <br />
    </Dialog>
  );
}

MarkerDialog.propTypes = {
  index: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function Misc(props) {
  useEffect(() => {
    props.changeHeader(Title);

    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAKk8han0sj_7njsLjXTyFq-5f3BEKBufw';
    script.async = true;
    script.onload = () => createMap();
    document.body.appendChild(script);
  });

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(false);

  const handleClickOpen = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function createMap() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      // center: {lat: 37.412177, lng: -121.959926},
      center: { lat: 37.39, lng: -121.945 },
      zoom: 13,
    });

    const GRTStartMarker = new window.google.maps.Marker({
      position: { lat: 37.423404, lng: -121.975947 },
      map: map,
      title: 'Guadalupe River Trail start',
    });

    const GRTBridgeMarker = new window.google.maps.Marker({
      position: { lat: 37.40097, lng: -121.94195 },
      map: map,
      title: 'Guadalupe River Trail bridge',
    });

    const GRTAirportMarker = new window.google.maps.Marker({
      position: { lat: 37.3545, lng: -121.91279 },
      map: map,
      title: 'Guadalupe River Trail airport terminus',
    });

    GRTStartMarker.addListener('click', function () {
      handleClickOpen(0);
    });

    GRTBridgeMarker.addListener('click', function () {
      handleClickOpen(1);
    });

    GRTAirportMarker.addListener('click', function () {
      handleClickOpen(2);
    });

    const grtPath = new window.google.maps.Polyline({
      path: GrtCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    grtPath.setMap(map);
  }

  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div className='content'>
        <br />
        <h1>Everything Else</h1>
        <h2>Cycling</h2>
        <p className='text-block'>
          In my free time, I sometimes like to go cycling, mostly along the
          Guadalupe River Trail. I track my rides with the Strava app for which
          a widget of my weekly activity is shown. A map of one of my common
          routes can also be found below.
        </p>
        <br />
        <iframe
          title='Strava widget'
          className={classes.respStrava}
          frameBorder='0'
          allowtransparency='true'
          scrolling='no'
          src='https://www.strava.com/athletes/43951123/activity-summary/77224f8bfa6c9894d12700c94137ee4827ef735d'
        ></iframe>
        <br />
        <div>
          <div id='map' className={classes.map}></div>
          <br />
        </div>

        <div>
          <a href='https://www.270towin.com/maps/opQe7'>
            <img
              src='https://www.270towin.com/map-images/opQe7.png'
              className={classes.map270}
              alt='270towin map'
            />
            <p>Prediction made 3:30 PM PT 28 October 2020</p>
          </a>
          <br />
        </div>

        <MarkerDialog index={index} open={open} onClose={handleClose} />
        <div>
          {/*<div id="bridge-text">
        <h2>Popsicle Stick Bridges</h2>
        <p className="text-block">
          As part of my high school AP Physics 1 course, we built and tested
          bridges made of only popsicle sticks and wood glue. The blog and video
          below provide insight into our group's design process and results. In
          the end, our bridge held 565 pounds while only weighing 1.0494 pounds,
          giving it an efficiency of 538.
        </p>
        <a href="https://what-a-resilient-bridge.weebly.com/"
          ><button className="center misc-button" id="bridge-blog">
            Bridge blog
          </button>
        </a>
      </div>
      <div className="resp-container" id="bridge-video">
        <iframe
          className="responsive-iframe"
          src="https://www.youtube.com/embed/cG5Qb2XNFQU"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope;
	        picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <a id="show0-link" href="/images/IMG_8732.jpg">
        <img className="slideshow" id="show0" src="/images/IMG_8732.jpg" />
      </a>
      <div>
        <button onclick="changeSlide(0, -1)" className="slideshow-button">
          &#10094;
        </button>
        <button onclick="changeSlide(0, 1)" className="slideshow-button">
          &#10095;
        </button>
      </div>
      <p>
        The summer after this project, I made a bridge out of coffee stirrers
        instead of popsicle sticks just for fun. Unlike the popsicle stick
        bridge, this one was never tested and so remains intact.
      </p>
      <a id="show1-link" href="/images/IMG_2715.jpg">
        <img className="slideshow" id="show1" src="/images/IMG_2715.jpg" />
      </a>
      <div>
        <button onclick="changeSlide(1, -1)" className="slideshow-button stirrer">
          &#10094;
        </button>
        <button onclick="changeSlide(1, 1)" className="slideshow-button stirrer">
          &#10095;
        </button>
      </div>*/}
        </div>
      </div>
    </>
  );
}

export default Misc;
