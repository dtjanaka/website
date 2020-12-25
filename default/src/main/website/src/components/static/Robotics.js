import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Robotics';

function Robotics(props) {
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
        <h1 className='contentTitle'>Robotics</h1>
        <p className='textBlock'>
          86868: The Resistance was a high school robotics team from Santa
          Clara, California consisting of brothers Bryon Tjanaka and Dylon
          Tjanaka. The team competed in the VEX Robotics Competition from
          2016-2019. In its inaugural season playing the game Starstruck, the
          team experienced unprecedented success, winning 13 regional
          tournaments and the 2017 VEX Robotics High School World Championship.
          Until its retirement in 2019, The Resistance continued to experience
          great success, gathering numerous accolades and winning the 2018
          California State Championship. In total, The Resistance received 93
          awards in its three-season career.
        </p>
        <br />
        <hr />
        <br />
        <h2>86868 Season Recap 2016-2017</h2>
        <p>
          A recap of 86868's first VEX season, Starstruck, which culminated in a
          World Championship title in Louisville, Kentucky.
        </p>
        <br />
        <div className='respContainer'>
          <iframe
            title='86868 Season Recap 2016-2017'
            className='responsiveIframe'
            src='https://www.youtube.com/embed/hUtrqf6Oids'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope;
	        picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <br />
        <h2>86868: THE RESISTANCE - 86868R VEX In The Zone Season Recap</h2>
        <p>
          A recap of 86868's second VEX season, In The Zone during which the
          team won the California State Championship.
        </p>
        <br />
        <div className='respContainer'>
          <iframe
            title='86868: THE RESISTANCE - 86868R VEX In The Zone Season Recap'
            className='responsiveIframe'
            src='https://www.youtube.com/embed/eGpasQFLgAY'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope;
	        picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <br />
        <h2>2017 VRC Engr Q110 - 200D 2S vs 86868 333X - 24 to 29</h2>
        <p className='textBlock'>
          An example Starstruck match played at the World Championships. 86868's
          robot is on the blue alliance, starting in the lower righthand corner
          of the screen.
        </p>
        <br />
        <div className='respContainer'>
          <iframe
            title='2017 VRC Engr Q110 - 200D 2S vs 86868 333X - 24 to 29'
            className='responsiveIframe'
            src='https://www.youtube.com/embed/A8gQNJh9yCM'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope;
	        picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <br />
        <h2>2018 VRC Arts Q73 - 7536B 86868R vs 8192B 20785B - 140 to 66</h2>
        <p className='textBlock'>
          An example In The Zone match played at the World Championships.
          86868's robot is on the red alliance, visible on the left side of the
          screen at the beginning.
        </p>
        <br />
        <div className='respContainer'>
          <iframe
            title='2018 VRC Arts Q73 - 7536B 86868R vs 8192B 20785B - 140 to 66'
            className='responsiveIframe'
            src='https://www.youtube.com/embed/5tjxxdGJM0I'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope;
	        picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <br />
      </div>
    </>
  );
}

export default Robotics;
