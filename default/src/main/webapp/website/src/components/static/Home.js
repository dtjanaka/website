import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';

const Title = 'Dylon Tjanaka | Home';

function Home() {
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <Header name='Dylon Tjanaka > Home' />
      <div className='content'>
        <br />
        <h1>Home</h1>
      </div>
    </>
  );
}

export default Home;
