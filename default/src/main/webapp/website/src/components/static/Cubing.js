import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Button from '@material-ui/core/Button';
import { cubing1 } from '../../images';

const Title = 'Dylon Tjanaka | Cubing';

const useStyles = makeStyles((theme) => ({
  centerButton: {
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function Cubing() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <Header name='Dylon Tjanaka > Cubing' />
      <div className='content'>
        <br />
        <h1>Cubing</h1>
        <p className='text-block'>
          I first learned to solve the Rubik's Cube in 7th grade with the help
          of online tutorials. Since then, I have spent thousands of hours
          solving the Rubik's Cube and other twisty puzzles. Cubing has allowed
          me to have fun, compete, and meet awesome new people. In high school,
          I started a Cubing Club which continues to thrive and grow. In
          college, I likewise joined the school's Cubing Club. I have attended
          three cubing competitions, each of which was a blast. Over time, I
          have gotten my times for the Rubik's Cube consistently below 20
          seconds. I use the Oretega method for 2x2, CFOP for 3x3 (full PLL),
          and the Yau method for 4x4. My personal bests for several puzzles are
          shown below.
        </p>
        <br />
        <Button
          variant='contained'
          className={classes.centerButton}
          color='primary'
          href='https://www.worldcubeassociation.org/persons/2015TJAN01'
          target='_blank'
        >
          View my WCA profile!
        </Button>
        <br />
        <table>
          <tr>
            <th colspan='6'>Personal Bests</th>
          </tr>
          <tr>
            <th className='puzzle'>Puzzle</th>
            <th className='times'>Single</th>
            <th className='times'>Mean of 3</th>
            <th className='times'>Avg of 5</th>
            <th className='times'>Avg of 12</th>
            <th className='times'>Avg of 1000</th>
          </tr>
          <tr>
            <td className='puzzle'>3x3</td>
            <td className='times'>10.09</td>
            <td className='times'>12.95</td>
            <td className='times'>13.79</td>
            <td className='times'>14.95</td>
            <td className='times'>17.30</td>
          </tr>
          <tr>
            <td className='puzzle'>4x4</td>
            <td className='times'>-</td>
            <td className='times'>-</td>
            <td className='times'>-</td>
            <td className='times'>-</td>
            <td className='times'>-</td>
          </tr>
        </table>
        <br />
        <a href={cubing1}>
          <img
            className='center responsive'
            src={cubing1}
            alt='Solving a skewb at a WCA competition'
          />
        </a>
        <p className='caption'>
          Solving a Skewb at the SPCS Stanford Spring 2015 competition (19 April
          2015)
        </p>
        <br />
      </div>
    </>
  );
}

export default Cubing;
