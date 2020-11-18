import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';

const Title = 'Dylon Tjanaka | Contact';

function Contact() {
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <Header name='Dylon Tjanaka > Contact' />
      <div className='content'>
        <br />
        <h1>Contact</h1>
        <br />
      </div>
    </>
  );
}

export default Contact;
