import React, { useEffect } from 'react';

const Title = 'Dylon Tjanaka | Settings';

function Settings(props) {
  useEffect(() => {
    props.changeHeader(Title);
  });

  return (
    <div className='content'>
      <h1>Settings</h1>
    </div>
  );
}

export default Settings;
