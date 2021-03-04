import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
// prettier-ignore
import {pfp0, pfp1, pfp2, pfp3, pfp4, pfp5, pfp6, pfp7,
        pfp8, pfp9, pfp10, pfp11, pfp12, pfp13, pfp14, pfp15,
        pfp16, pfp17, pfp18, pfp19, pfp20, pfp21, pfp22, pfp23,
        pfp24, pfp25, pfp26, pfp27, pfp28, pfp29, pfp30, pfp31,
        pfp32 }  from '../../images';
import { Link } from 'react-router-dom';

const Title = 'Dylon Tjanaka | Homepage';

function Home(props) {
  useEffect(() => {
    // https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
    props.changeHeader(Title);
  });

  return (
    <>
      <Helmet>
        <title>{Title}</title>
        {/* icon library */}
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
      </Helmet>
      <div className='content'>
        <br />
        <h1 className='contentTitle'>Dylon Tjanaka</h1>
        <hr />
        <br />
        <a id='pfpLink' href={pfp0}>
          <img id='pfp' className='center responsive' src={pfp0} alt='me' />
        </a>
        <br />
        <p className='textBlock'>
          Welcome to my page! I am a rising second-year studying CS at UCLA.
          When I’m not in LA, I live in Santa Clara, California with my parents
          and older brother. My interests include algorithms and machine
          learning and my hobbies include robotics, cubing, and 3D printing.
        </p>
        <br />
        <button
          onClick={addRandomPrequelQuote}
          className='center miscButton blue odd'
        >
          Click here for a prequels quote!
        </button>
        <div id='contentContainer'></div>
        <button
          onClick={changeProfilePic}
          className='center miscButton blue even'
        >
          Click here to change my picture!
        </button>
        <Link to='/widgets'>
          <button id='widgets' className='center miscButton blue odd'>
            Click here to see some JS widgets!
          </button>
        </Link>
        <Link to='/comments'>
          <button id='comments' className='center miscButton blue even'>
            Click here to leave a comment!
          </button>
        </Link>
        <br />
        <p>Or click the links below to learn more about me!</p>
        <br />
        <div id='links' className='row'>
          <div className='col-3'>
            <Link to='/robotics'>
              <button className='interestButton odd'>Robotics</button>
            </Link>
          </div>
          <div className='col-3'>
            <Link to='/micromouse'>
              <button className='interestButton even'>Micromouse</button>
            </Link>
          </div>
          <div className='col-3'>
            <Link to='/cubing'>
              <button className='interestButton odd'>Cubing</button>
            </Link>
          </div>
          <div className='col-3'>
            <Link to='/printing'>
              <button className='interestButton even'>3D Printing</button>
            </Link>
          </div>
        </div>
        <div id='links-2' className='row'>
          <div className='col-3'>
            <Link to='/misc'>
              <button id='miscLink' className='interestButton even'>
                Miscellaneous
              </button>
            </Link>
          </div>
          <div className='col-9'></div>
        </div>
        <div id='socialMedia' className='row'>
          <br />
          <div id='facebook' className='col-3'>
            <a
              href='https://www.facebook.com/profile.php?id=100014709977810'
              target='_blank'
              rel='noopener noreferrer'
              className='fa fa-facebook'
              style={{ fontSize: '50px' }}
            >
              {' '}
            </a>
          </div>
          <div className='col-3'>
            <a
              href='https://www.instagram.com/dylon.tjanaka/'
              target='_blank'
              rel='noopener noreferrer'
              className='fa fa-instagram'
              style={{ fontSize: '50px' }}
            >
              {' '}
            </a>
          </div>
          <div id='linkedin' className='col-3'>
            <a
              href='https://www.linkedin.com/in/dylon-tjanaka-971508192'
              target='_blank'
              rel='noopener noreferrer'
              className='fa fa-linkedin'
              style={{ fontSize: '50px' }}
            >
              {' '}
            </a>
          </div>
          <div className='col-3'>
            <a
              href='https://github.com/dtjanaka/'
              target='_blank'
              rel='noopener noreferrer'
              className='fa fa-github'
              style={{ fontSize: '50px' }}
            >
              {' '}
            </a>
          </div>
        </div>
        <div id='socialMedia-2' className='row'>
          <div className='col-3'>
            <a
              href='https://www.youtube.com/channel/UCx1tcHdDx4esRDbmDgRIn9Q'
              target='_blank'
              rel='noopener noreferrer'
              className='fa fa-youtube-play'
              style={{ fontSize: '50px' }}
            >
              {' '}
            </a>
          </div>
          <div className='col-9'></div>
        </div>
        <br />
      </div>
    </>
  );
}

/**
 * Adds a random quote to the page.
 */
function addRandomPrequelQuote() {
  const quotes = [
    'Hello there.',
    'There’s always a bigger fish.',
    'I don’t like sand. It’s coarse and rough and irritating and it gets' +
      ' everywhere.',
    'Now this is podracing!',
    'I don’t care what universe you’re from, that’s got to hurt!',
    'I sense Count Dooku.',
    'His cells have the highest concentration of midi-chlorians I have' +
      ' seen in a life-form.',
    'I AM the Senate!',
    'I’m just a simple man, trying to make my way in the universe.',
    'This is getting out of hand! Now, there are two of them!',
  ];

  const quoteContainer = document.getElementById('contentContainer');
  quoteContainer.style.display = 'block';
  quoteContainer.style.textAlign = 'center';

  // Pick a random different quote.
  let quote = quoteContainer.innerText;
  while (quote === quoteContainer.innerText) {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
  }

  // Add it to the page.
  quoteContainer.innerHTML = '<br /><p>' + quote + '</p><br />';
}

/**
 * Changes profile picture to random image.
 */
function changeProfilePic() {
  // prettier-ignore
  const images = [
    pfp0, pfp1, pfp2, pfp3, pfp4, pfp5, pfp6, pfp7,
    pfp8, pfp9, pfp10, pfp11, pfp12, pfp13, pfp14, pfp15,
    pfp16, pfp17, pfp18, pfp19, pfp20, pfp21, pfp22, pfp23,
    pfp24, pfp25, pfp26, pfp27, pfp28, pfp29, pfp30, pfp31,
    pfp32
  ];

  // Pick random different image.
  let imgElement = document.getElementById('pfp');
  let img = imgElement.src;
  while (img === imgElement.src) {
    img = images[Math.floor(Math.random() * images.length)];
  }

  // Add it to the page.
  document.getElementById('pfpLink').href = img;
  imgElement.src = img;
}

export default Home;
