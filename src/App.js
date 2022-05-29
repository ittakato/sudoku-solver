import { useContext } from 'react';

import './App.css';

import { SudokuContext } from './contexts/sudoku.context';

import SudokuBoard from './components/SudokuBoard';
import SolveButton from './components/SolveButton';
import Timer from './components/Timer/Timer';
import MistakeIcon from './components/MistakeIcon';

import { solveSudokuWithAnimations, solveSudoku } from './utility/solveSudoku';

const App = () => {
  const {
    numberOfMistakes,
    setNumberOfMistakes,
    currentSudoku,
    setCurrentSudoku,
  } = useContext(SudokuContext);

  const mistakeIcons = [];
  if (numberOfMistakes < 5) {
    for (let i = 0; i < numberOfMistakes; i++) {
      mistakeIcons.push(<MistakeIcon style={{ marginRight: '5px' }} />);
    }
  }

  const solveButtonOnClickHandler = () => {
    const sudokuCopy = JSON.parse(JSON.stringify(currentSudoku));
    const sudokuCopy2 = JSON.parse(JSON.stringify(currentSudoku));

    if (!solveSudoku(sudokuCopy2)) {
      // Do something (like an alert/flash to say board cannot be solved).
      console.log('Board cannot be solved');
      return;
    }

    const animations = solveSudokuWithAnimations(sudokuCopy);

    for (let i = 0; i < animations.length; i++) {
      const inputBoxes = document.querySelectorAll('#sudoku > input');
      const [row, col, num] = animations[i];

      // grab the element with (key = row*9+col)
      const inputBox = inputBoxes[row * 9 + col];
      setTimeout(() => {
        if (num === 0) {
          // red
          inputBox.style.border = '1.5px solid #ea1717';
          inputBox.value = num;
        } else {
          // green
          inputBox.style.border = '1.5px solid #31ee44';
          inputBox.value = num;
        }
      }, i * 75);
    }
  };

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
      <SolveButton onClick={solveButtonOnClickHandler}>Solution</SolveButton>
      <Timer />
    </div>
  );
};

export default App;
