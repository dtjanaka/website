import React, { useEffect } from 'react';

function Comments(props) {
  useEffect(() => {
    props.changeHeader('Dylon Tjanaka > Comments');
  });

  return (
    <div>
      <h1>Comments</h1>
    </div>
  );
}

export default Comments;
