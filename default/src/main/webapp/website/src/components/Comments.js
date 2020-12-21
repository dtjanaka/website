import React, { useEffect } from 'react';

const Title = 'Dylon Tjanaka | Comments';

function Comments(props) {
  useEffect(() => {
    props.changeHeader(Title);
  });

  return (
    <div>
      <h1>Comments</h1>
    </div>
  );
}

export default Comments;
