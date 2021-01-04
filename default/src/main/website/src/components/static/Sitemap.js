import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
        <hr />
        <br />
        <Link to='/'>Home</Link>
        <br />
        <Link to='/about-website'>About Website</Link>
        <br />
        <br />
        <Link to='/robotics'>Robotics</Link>
        <br />
        <Link to='/printing'>3D Printing</Link>
        <br />
        <Link to='/cubing'>Speedcubing</Link>
        <br />
        <Link to='/micromouse'>Micromouse</Link>
        <br />
        <Link to='/widgets'>Widgets</Link>
        <br />
        <Link to='/misc'>Miscellaneous</Link>
        <br />
        <br />
        <Link to='/comments'>Comments</Link>
        <br />
        <Link to='/profile'>Profile</Link>
        <br />
        <Link to='/settings'>Settings</Link>
        <br />
        <br />
        <Link to='/privacy-policy'>Privacy Policy</Link>
        <br />
        <Link to='/sitemap'>Sitemap</Link>
        <br />
        <Link to='/contact'>Contact</Link>
        <br />
        <br />
      </div>
    </>
  );
}

export default Sitemap;
