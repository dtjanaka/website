import React, { useEffect } from 'react';

function Settings(props) {
  useEffect(() => {
    props.changeHeader('Dylon Tjanaka > Settings');
  });

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}

export default Settings;
