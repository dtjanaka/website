import React, { useEffect } from 'react';

const Title = 'Dylon Tjanaka | Comments';

function Comments(props) {
  useEffect(() => {
    props.changeHeader(Title);
  });

  return (
    <div className='content'>
      <h1 className='contentTitle'>Comments</h1>
    </div>
  );
}

export default Comments;
