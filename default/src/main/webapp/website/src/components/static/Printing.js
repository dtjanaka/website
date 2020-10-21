import React from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | 3D Printing';

function Printing() {
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div>
        <h1>Printing</h1>
      </div>
    </>
  );
}

export default Printing;
