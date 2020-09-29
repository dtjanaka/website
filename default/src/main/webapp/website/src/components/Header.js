import React from 'react';

// Use App Bar from Material
function Header(props) {
    return (
        <div style={headerStyle}>
          <h1>{props.name}</h1>  
        </div>
    );
}

const headerStyle = {
  width: '100%',
  backgroundColor: '#ebebff',
};

export default Header;
