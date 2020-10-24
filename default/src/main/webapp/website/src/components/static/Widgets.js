import { Widgets } from '@material-ui/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';

const Title = 'Dylon Tjanaka | Widgets';

function Widgets() {
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <Header name='Dylon Tjanaka > Widgets' />
      <div className='content'>
        <br />
      </div>
    </>
  );
}

export default Widgets;
