import React from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Home';

function Home() {
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div className='content'>
        <br />
        <h1>Home</h1>
      </div>
    </>
  );
}

export default Home;
