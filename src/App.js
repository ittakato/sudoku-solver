import { useContext, useState } from 'react';

import './App.css';

import { SudokuContext } from './contexts/sudoku.context';

import SudokuBoard from './components/SudokuBoard';
import SolveButton from './components/SolveButton';
import NewSudokuButton from './components/NewSudokuButton';
import Timer from './components/Timer/Timer';
import MistakeIcon from './components/MistakeIcon';
import DifficultySelector from './components/DifficultySelector';

import { solveSudokuWithAnimations, solveSudoku } from './utility/solveSudoku';

import { generateSudoku } from './utility/generateSudoku';

const App = () => {
  const {
    numberOfMistakes,
    setNumberOfMistakes,
    currentSudoku,
    setCurrentSudoku,
    difficulty,
    setDifficulty,
  } = useContext(SudokuContext);

  const mistakeIcons = [];
  if (numberOfMistakes < 5) {
    for (let i = 0; i < numberOfMistakes; i++) {
      mistakeIcons.push(
        <MistakeIcon style={{ marginRight: '5px' }} key={Math.random()} />
      );
    }
  }

  const disableButtonsAndSelect = timeout => {
    const solveButton = document.querySelector('#solve-button');
    const newSudokuButton = document.querySelector('#new-sudoku-button');
    const optionsSelector = document.querySelector('#difficulty-selector');

    solveButton.disabled = true;
    newSudokuButton.disabled = true;
    optionsSelector.disabled = true;

    setTimeout(() => {
      // solveButton.disabled = false;
      newSudokuButton.disabled = false;
      optionsSelector.disabled = false;
    }, timeout);
  };

  const enableButtonsAndSelect = () => {
    const solveButton = document.querySelector('#solve-button');
    const newSudokuButton = document.querySelector('#new-sudoku-button');
    const optionsSelector = document.querySelector('#difficulty-selector');

    solveButton.disabled = false;
    newSudokuButton.disabled = false;
    optionsSelector.disabled = false;
  };

  const solveButtonOnClickHandler = () => {
    const sudokuCopy = JSON.parse(JSON.stringify(currentSudoku));
    const sudokuCopy2 = JSON.parse(JSON.stringify(currentSudoku));

    if (!solveSudoku(sudokuCopy2)) {
      // Do something (like an alert/flash to say board cannot be solved).
      console.log('Board cannot be solved');
      return;
    }

    const animations = solveSudokuWithAnimations(sudokuCopy);

    const numOfAnimations = animations.length;

    // In miliseconds
    let animation_speed = 3000 / numOfAnimations; // lower is faster

    // Animation Here
    for (let i = 0; i < numOfAnimations; i++) {
      const inputBoxes = document.querySelectorAll('#sudoku > input');
      const [row, col, num] = animations[i];

      // grab the element with (key = row*9+col)
      const inputBox = inputBoxes[row * 9 + col];
      setTimeout(() => {
        if (num === 0) {
          // red
          inputBox.style.border = '3px solid #787ff6';
          inputBox.value = num;
        } else {
          // green
          inputBox.style.border = '3px solid #fff';
          inputBox.value = num;
        }
      }, i * animation_speed); // animation speed
    }

    disableButtonsAndSelect(numOfAnimations * animation_speed);
  };

  const generateSudokuHandler = () => {
    const board = generateSudoku(difficulty); // change difficulty here
    setCurrentSudoku(board);

    // Fix color and placeholders
    const inputBoxes = document.querySelectorAll('#sudoku > input');
    for (const inputBox of inputBoxes) {
      inputBox.style.border = '2px solid #fff';
      inputBox.placeholder = '';
    }

    // Reset mistakes
    setNumberOfMistakes(0);

    // enable buttons
    enableButtonsAndSelect();
  };

  const difficultyChangeHandler = event => {
    const difficultyName = event.target.value;
    let difficultyValue;

    if (difficultyName === 'easy') {
      difficultyValue = 40;
    } else if (difficultyName === 'medium') {
      difficultyValue = 45;
    } else {
      difficultyValue = 50;
    }

    setDifficulty(difficultyValue);

    // generate new sudoku
    const board = generateSudoku(difficultyValue);
    setCurrentSudoku(board);
    const inputBoxes = document.querySelectorAll('#sudoku > input');
    for (const inputBox of inputBoxes) {
      inputBox.style.border = '2px solid #fff';
      inputBox.placeholder = '';
    }

    // reset mistakes
    setNumberOfMistakes(0);

    // enable buttons
    enableButtonsAndSelect();
  };

  return (
    <div className="App">
      <canvas id="my-canvas" />
      <h1 className="title">Sudoku</h1>
      <Timer />
      <div className="board-container">
        <SudokuBoard className="board" />
      </div>
      <div className="mistakes-container">
        {numberOfMistakes === 0 ? <>&nbsp;</> : ''}
        {numberOfMistakes >= 5 ? (
          <MistakeIcon style={{ marginLeft: '5px' }} key={Math.random()} />
        ) : (
          ''
        )}
        {numberOfMistakes >= 5 ? ` : ${numberOfMistakes}` : mistakeIcons}
      </div>
      <div className="buttons-container">
        <DifficultySelector onChange={difficultyChangeHandler} />
        <SolveButton onClick={solveButtonOnClickHandler}>Solution</SolveButton>
        <NewSudokuButton onClick={generateSudokuHandler}>
          New Sudoku
        </NewSudokuButton>
      </div>
    </div>
  );
};

export default App;
