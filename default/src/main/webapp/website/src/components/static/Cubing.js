import React from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Cubing';

function Cubing() {
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div>
        <h1>Cubing</h1>
      </div>
    </>
  );
}

export default Cubing;
