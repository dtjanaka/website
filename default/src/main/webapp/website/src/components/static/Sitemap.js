import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';

const Title = 'Dylon Tjanaka | Sitemap';

function Sitemap() {
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <Header name='Dylon Tjanaka > Sitemap' />
      <div className='content'>
        <br />
        <h1>Sitemap</h1>
        <br />
      </div>
    </>
  );
}

export default Sitemap;
