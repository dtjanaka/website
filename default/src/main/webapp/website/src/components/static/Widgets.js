import { Widgets } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Widgets';

function Widgets() {
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
      </div>
    </>
  );
}

export default Widgets;
