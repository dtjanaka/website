import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Sitemap';

function Sitemap(props) {
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
        <h1 className='contentTitle'>Sitemap</h1>
        <br />
        <hr />
        <br />
      </div>
    </>
  );
}

export default Sitemap;
