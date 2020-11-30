import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Sitemap';

function Sitemap(props) {
  useEffect(() => {
    props.changeHeader('Dylon Tjanaka > Sitemap');
  });

  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div className='content'>
        <br />
        <h1>Sitemap</h1>
        <br />
      </div>
    </>
  );
}

export default Sitemap;
