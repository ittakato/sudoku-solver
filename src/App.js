import { useContext } from 'react';

import './App.css';

import { SudokuContext } from './contexts/sudoku.context';

import SudokuBoard from './components/SudokuBoard';
import SolveButton from './components/SolveButton';
import Timer from './components/Timer/Timer';
import MistakeIcon from './components/MistakeIcon';

const solve = () => {
  const axios = require('axios');

  const options = {
    method: 'POST',
    url: 'https://solve-sudoku.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
      'X-RapidAPI-Key': '3dfd275bd9msh836165a39bd0e1fp1513cajsn8ea62c98af71',
    },
    data: '{"puzzle":"2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"}',
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const App = () => {
  const { numberOfMistakes, setNumberOfMistakes } = useContext(SudokuContext);

  const mistakeIcons = [];
  if (numberOfMistakes < 5) {
    for (let i = 0; i < numberOfMistakes; i++) {
      mistakeIcons.push(<MistakeIcon style={{ marginRight: '5px' }} />);
    }
  }

  return (
    <div className="App">
      <h1 className="title">Sudoku</h1>
      <div className="board-container">
        <SudokuBoard className="board" />
      </div>
      <div className="mistakes-container">
        {numberOfMistakes === 0 ? <>&nbsp;</> : ''}
        {numberOfMistakes >= 5 ? (
          <MistakeIcon style={{ marginLeft: '5px' }} />
        ) : (
          ''
        )}
        {numberOfMistakes >= 5 ? ` : ${numberOfMistakes}` : mistakeIcons}
      </div>
      <SolveButton onClick={solve}>Solution</SolveButton>
      <Timer />
    </div>
  );
};

export default App;
