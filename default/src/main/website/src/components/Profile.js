import React, { useEffect } from 'react';

const Title = 'Dylon Tjanaka | Profile';

function Profile(props) {
  useEffect(() => {
    props.changeHeader(Title);
  });

  return (
    <div className='content'>
      <h1 className='contentTitle'>Profile</h1>
      <br />
      <hr />
      <br />
    </div>
  );
}

export default Profile;
