import React, { useEffect } from 'react';
import './Widgets.css';
import { Helmet } from 'react-helmet';
import { inversePaint } from './logic/invertWidget';
import { ticTacToe, resetTicTacToe } from './logic/tictactoe';
import { grid } from '../../images';

const Title = 'Dylon Tjanaka | Widgets';

function Widgets(props) {
  useEffect(() => {
    props.changeHeader(Title);
  });

  window.onload = function () {
    for (let i = 1; i <= 9; i++) {
      document.getElementById(i).onclick = () => {
        ticTacToe(i);
      };
    }
    inversePaint(grid, 256, 256);
  };

  // prettier-ignore
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <div className='content'>
        <br />
        <h1 className='contentTitle'>Widgets</h1>
        <hr />
        <br />
        <h2>Tic-Tac-Toe</h2>
          <p id='player-turn'>Player X, make your move.</p>
          <br />
          <div style={{'textAlign': 'center'}}>
            <div className='tac-cont'>
              <button id='1' className='tictactoe'></button>
              <button id='2' className='tictactoe'></button>
              <button id='3' className='tictactoe'></button>
            </div>
            <div className='tac-cont'>
              <button id='4' className='tictactoe'></button>
              <button id='5' className='tictactoe'></button>
              <button id='6' className='tictactoe'></button>
            </div>
            <div className='tac-cont'>
              <button id='7' className='tictactoe'></button>
              <button id='8' className='tictactoe'></button>
              <button id='9' className='tictactoe'></button>
            </div>
            <br />
            <button
              id='reset'
              className='center miscButton'
              onClick={resetTicTacToe}
            >
              Reset board
            </button>
          <br />
          </div>
          <h2>HTML Canvas</h2>
          <br />
          <canvas id='canvas1' width='256' height='256'> </canvas>
          <br />
          <form id='brushOptions'>
            <label htmlFor='brushSize'>Brush size:</label>
            <input
              type='number'
              id='brushSize'
              name='brushSize'
              min='1'
              max='25'
              defaultValue='5'
            />
          </form>
          <br />
      </div>
    </>
  );
}

export default Widgets;
