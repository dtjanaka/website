import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Header from '../Header';
import { GrtCoordinates } from '../Constants';
import { map1, map2, map3 } from '../../images';

const Title = 'Dylon Tjanaka | Everything Else';

const useStyles = makeStyles((theme) => ({
  respStrava: {
    display: 'table',
    width: '100%',
    height: '160px',
  },
}));

function MarkerDialog(props) {
  const index = props;
  const imgs = [map1, map2, map3];
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
  return (
    <Dialog>
      <DialogTitle></DialogTitle>
      <img src={imgs[index]} />
      <p>{text[index]}</p>
    </Dialog>
  );
}

function Misc() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAKk8han0sj_7njsLjXTyFq-5f3BEKBufw';
    script.async = true;
    script.onload = () => createMap();
    document.body.appendChild(script);
  });

  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <Header name='Dylon Tjanaka > Everything Else' />
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
          <div id='map' style={mapStyle}></div>
          <br />
          <div id='half-content-container'></div>
        </div>
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
    </>
  );
}

export default Misc;

const mapStyle = {
  height: '650px',
  width: '100%',
}; /*
function createCloseButtonElement() {
  const buttonElement = document.createElement('button');
  buttonElement.innerText = 'Close';
  buttonElement.onclick = function () {
    closeInfo();
  };
  buttonElement.className = 'misc-button';
  return buttonElement;
}*/ /*
function createPElement(text) {
  const pElement = document.createElement('p');
  pElement.innerText = text;
  return pElement;
}*/

/**
 * Create close button for expanding info box.
 */ /**
 * Creates a <p> element containing text.
 */ /**
 * Creates a map and adds it to the page.
 */
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
  /*
  GRTStartMarker.addListener('click', function () {
    closeInfo();
    if (window.innerWidth >= 1600) {
      document.getElementById('map').style.width = '50%';
    }
    const mapInfoContainer = document.getElementById('half-content-container');
    mapInfoContainer.innerHTML =
      '<a href="/images/IMG_2686.jpg">' +
      '<img src="/images/IMG_2686.jpg" style="width: 100%" /></a>';
    mapInfoContainer.appendChild(
      createPElement('Me at the start of the trail! I ride here frequently.')
    );
    mapInfoContainer.appendChild(
      createPElement(
        'The bike is a white Poseidon Expressway-SXL, a flat bar ' +
          'road bike with fixed gears (46T/16T gear ratio), ' +
          'a 6061 aluminum frame, and 700x25mm tires.'
      )
    );
    mapInfoContainer.appendChild(createCloseButtonElement());
  });

  GRTBridgeMarker.addListener('click', function () {
    closeInfo();
    if (window.innerWidth >= 1600) {
      document.getElementById('map').style.width = '50%';
    }
    const mapInfoContainer = document.getElementById('half-content-container');
    mapInfoContainer.innerHTML =
      '<a href="/images/IMG_2744.jpg">' +
      '<img src="/images/IMG_2744.jpg" style="width: 100%" /></a>';
    mapInfoContainer.appendChild(
      createPElement(
        'River Oaks Bridge across the Guadalupe River ' +
          'connecting the lower and upper trails.'
      )
    );
    mapInfoContainer.appendChild(createCloseButtonElement());
  });

  GRTAirportMarker.addListener('click', function () {
    closeInfo();
    if (window.innerWidth >= 1600) {
      document.getElementById('map').style.width = '50%';
    }
    const mapInfoContainer = document.getElementById('half-content-container');
    mapInfoContainer.innerHTML =
      '<a href="/images/IMG_2751.jpg">' +
      '<img src="/images/IMG_2751.jpg" style="width: 100%" /></a>';
    mapInfoContainer.appendChild(
      createPElement(
        'The trail passes right next to Mineta San Jose ' +
          'International Airport!'
      )
    );
    mapInfoContainer.appendChild(createCloseButtonElement());
  });*/

  const grtPath = new window.google.maps.Polyline({
    path: GrtCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  grtPath.setMap(map);
}
/*
function closeInfo() {
  document.getElementById('half-content-container').innerHTML = '';
  document.getElementById('map').style.width = '100%';
}

window.addEventListener('resize', function () {
  if (window.innerWidth < 1600) {
    document.getElementById('map').style.width = '100%';
  } else if (
    document.getElementById('half-content-container').innerHTML !== ''
  ) {
    document.getElementById('map').style.width = '50%';
  }
});*/
