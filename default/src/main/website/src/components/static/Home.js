import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Title = 'Dylon Tjanaka | Homepage';

function Home(props) {
  useEffect(() => {
    // https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
    props.changeHeader(Title);
  });

  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div className='content'>
        <br />
        <h1 className='contentTitle'>Home</h1>
        <hr />
        <br />
      </div>
    </>
  );
}

export default Home;
