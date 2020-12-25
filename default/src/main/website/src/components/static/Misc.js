import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { GrtCoordinates } from '../Constants';
import { map1, map2, map3 } from '../../images';
import { I8732, I8795, I8819 } from '../../images';
import { I2715, I2718, I2722 } from '../../images';
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
  const [index, setIndex] = React.useState(0);

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
      strokeColor: '#ff0000',
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
        <h1 className='contentTitle'>Everything Else</h1>
        <br />
        <hr />
        <br />
        <h2>Cycling</h2>
        <p className='textBlock'>
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

        <MarkerDialog index={index} open={open} onClose={handleClose} />

        <div>
          <div>
            <h2>Popsicle Stick Bridges</h2>
            <p className='textBlock'>
              As part of my high school AP Physics 1 course, we built and tested
              bridges made of only popsicle sticks and wood glue. The blog and
              video below provide insight into our group's design process and
              results. In the end, our bridge held 565 pounds while only
              weighing 1.0494 pounds, giving it an efficiency of 538.
            </p>
            <br />
            <a href='https://what-a-resilient-bridge.weebly.com/'>
              <button className='center miscButton'>Bridge blog</button>
            </a>
            <br />
          </div>

          <div className='respContainer'>
            <iframe
              title='bridge video'
              className='responsiveIframe'
              src='https://www.youtube.com/embed/cG5Qb2XNFQU'
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope;
	        picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>

          <br />

          <a id='show0-link' href={I8732}>
            <img
              className='slideshow'
              id='show0'
              src={I8732}
              alt='popsicle stick bridge'
            />
          </a>
          <div>
            {/* just changeSlide(0, -1) calls the function immediately */}
            <button
              onClick={() => {
                changeSlide(0, -1);
              }}
              className='slideshowButton'
            >
              &#10094;
            </button>
            <button
              onClick={() => {
                changeSlide(0, 1);
              }}
              className='slideshowButton'
            >
              &#10095;
            </button>
          </div>

          <br />

          <p className='textBlock'>
            The summer after this project, I made a bridge out of coffee
            stirrers instead of popsicle sticks just for fun. Unlike the
            popsicle stick bridge, this one was never tested and so remains
            intact.
          </p>

          <br />

          <a id='show1-link' href={I2715}>
            <img
              className='slideshow'
              id='show1'
              src={I2715}
              alt='coffee stirrer bridge'
            />
          </a>
          <div>
            <button
              onClick={() => {
                changeSlide(1, -1);
              }}
              className='slideshowButton'
            >
              &#10094;
            </button>
            <button
              onClick={() => {
                changeSlide(1, 1);
              }}
              className='slideshowButton'
            >
              &#10095;
            </button>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

// Holds the current indices of both slideshows
let curShowIdxs = [0, 0];

/**
 * Change picture for either slideshow.
 */
function changeSlide(slideshowNum, direction) {
  const show = [
    [I8732, I8795, I8819],
    [I2715, I2718, I2722],
  ];

  curShowIdxs[slideshowNum] = (curShowIdxs[slideshowNum] + direction) % 3;
  // Handle negative numbers: -1 % 3 = -1, want to wrap around to 2
  if (curShowIdxs[slideshowNum] < 0) {
    curShowIdxs[slideshowNum] += 3;
  }

  const img = show[slideshowNum][curShowIdxs[slideshowNum]];
  if (!slideshowNum) {
    document.getElementById('show0').src = img;
    document.getElementById('show0-link').href = img;
  } else {
    document.getElementById('show1').src = img;
    document.getElementById('show1-link').href = img;
  }
}

export default Misc;
