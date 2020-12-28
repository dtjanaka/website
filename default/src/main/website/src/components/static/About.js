import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | About Website';

function About(props) {
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
        <h1 className='contentTitle'>About Website</h1>
        <hr />
        <br />
        <u>
          <a
            href='https://github.com/dtjanaka/website'
            rel='noopener noreferrer'
            target='_blank'
          >
            GitHub repo
          </a>
        </u>
        <br />
        <u>
          <a
            href='https://old.dtjanaka.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            Old website
          </a>
        </u>
        <p>Google App Engine - Java 8 servlets with React frontend</p>
      </div>
    </>
  );
}

export default About;
