import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Home';

function Home(props) {
  useEffect(() => {
    // https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
    props.changeHeader('Dylon Tjanaka > Home');
  });

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
