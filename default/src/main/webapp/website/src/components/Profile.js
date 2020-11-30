import React, { useEffect } from 'react';

function Profile(props) {
  useEffect(() => {
    props.changeHeader('Dylon Tjanaka > Profile');
  });

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
