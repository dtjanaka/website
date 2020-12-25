import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { rat, mm } from '../../images';

const Title = 'Dylon Tjanaka | Micromouse';

function Micromouse(props) {
  useEffect(() => {
    props.changeHeader(Title);
  });

  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div className='content'>
        <br />
        <h1 className='contentTitle'>Micromouse</h1>
        <p className='text textBlock'>
          Micromouse is an event where small robot mice solve a 16×16 maze. I
          first heard about it in high school, but only started in college after
          joining the UCLA IEEE club. Micromice autonomously navigate from the
          start of the maze to the center using sensors to map out walls and
          paths. Common sensors used on Micromice include encoders for measuring
          wheel movements, IRs for detecting walls, and gyroscopes for measuring
          rotations. Additionally, advanced mice incorporate mechanisms such as
          suction fans for greater normal force and maximum potential
          acceleration. I enjoy working on Micromouse because it involves both
          hardware and software. Besides applying concepts from my prior
          robotics experience and from my CS classes, I also gain a deep
          understanding of the EE side of things.
        </p>
        <br />
        <p className='text textBlock'>
          I have built two mice so far. The first one, a "rat," is a proven
          design provided by the Micromouse instructors in UCLA IEEE which
          allowed new Micromousers such as myself to learn the fundamentals. It
          is based off an ST Nucleo F411-RE development board and has a full
          sensor setup including four IRs and two encoders.
        </p>
        <br />
        <a href={rat}>
          <img className='center responsive' src={rat} alt='rat' />
        </a>
        <br />
        <p className='text'>
          Below is a proof-of-concept video of the rat autonomously traversing a
          short path:
        </p>
        <br />
        <div className='respContainer'>
          <iframe
            title='Micromouse Rat Competition Trial 3'
            className='responsiveIframe'
            src='https://www.youtube.com/embed/nHUUiYqV9mQ'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope;
	        picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <br />
        <p className='textBlock'>
          The second mouse I have worked on is a custom design using the
          STM32F405RGT6 chip. It was designed with Autodesk Eagle; programming
          is done in the STM32 CubeIDE environment. It has six IRs, two
          encoders, and a gyroscope. By adding two more IRs pointing diagonally,
          the mouse can detect openings in walls in advance.
        </p>
        <br />
        <a href={mm}>
          <img className='center responsive' src={mm} alt='micromouse' />
        </a>
        <br />
      </div>
    </>
  );
}

export default Micromouse;
