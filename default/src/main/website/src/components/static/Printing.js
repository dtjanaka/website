import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { print1, print2, print3, print4 } from '../../images';

const Title = 'Dylon Tjanaka | 3D Printing';

function Printing(props) {
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
        <h1>3D Printing</h1>
        <p className='text-block'>
          I first became interested in 3D printing through cubing when I became
          interested in making my own twisty puzzles. With the help of online
          tutorials, I learned how to CAD in Solidworks. In high school, with
          access to the school Makerspace's printers, I was able to bring my
          designs to life. Since then, I have gotten my own 3D printer at home
          and use it for everything from robotics and micromouse to replacement
          parts and keychains. 3D printing has allowed me to rapidly iterate
          small parts for many projects and served as a great outlet for my
          creativity.
        </p>
        <br />
        <p className='text-block'>
          Currently, I mainly design with Autodesk Inventor although I have also
          have experience with Solidworks and Fusion 360. I have a Tiertime UP
          Mini 2 printer at home.
        </p>
        <br />
        <a href={print1}>
          <img
            className='center responsive'
            src={print1}
            alt='Toware Takeover cube'
          />
        </a>
        <p className='caption'>
          A 3D-printed game object for VEX Tower Takeover
        </p>
        <br />
        <a href={print2}>
          <img className='center responsive' src={print2} alt='Chloe' />
        </a>
        <p className='caption'>A 3D-printed Harry Potter themed name sign</p>
        <br />
        <a href={print3}>
          <img
            className='center responsive'
            src={print3}
            alt='86868 keychains'
          />
        </a>
        <p className='caption'>3D-printed keychains for my robotics team</p>
        <br />
        <a href={print4}>
          <img className='center responsive' src={print4} alt='BT logos' />
        </a>
        <p className='caption'>3D-printed keychains for my brother</p>
        <br />
      </div>
    </>
  );
}

export default Printing;
