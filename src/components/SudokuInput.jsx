import { useState, useContext, useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';

import { SudokuContext } from '../contexts/sudoku.context';

import styles from './SudokuInput.module.css';

import { isValid, solveSudoku, sudokuIsSolved } from '../utility/solveSudoku';

const SudokuInput = props => {
  const {
    currentSudoku,
    setCurrentSudoku,
    numberOfMistakes,
    setNumberOfMistakes,
  } = useContext(SudokuContext);

  const [curValue, setCurValue] = useState(0);

  const [placeholderValue, setPlaceholderValue] = useState('');

  let row = Math.floor(props.inputId / 9);
  let col = props.inputId % 9;

  // set placeholder onchange
  const onChangeHandler = event => {
    let inputValue = event.target.value;

    if (!isNaN(inputValue)) {
      inputValue = parseInt(inputValue);
    } else {
      return;
    }

    if (!Number.isInteger(inputValue)) {
      return;
    }

    if (inputValue <= 0 || inputValue >= 10) {
      return;
    }

    if (inputValue !== '0') {
      setPlaceholderValue(inputValue);
    }
  };

  // Do the below
  const onKeyDownHandler = event => {
    const x = event.keyCode;

    // 27 is ESC key.
    if (x === 27) {
      event.target.blur();
    }
    // 13 is Enter key.
    else if (x === 13) {
      let inputValue = placeholderValue;

      if (!isNaN(inputValue)) {
        inputValue = parseInt(inputValue);
      } else {
        return;
      }

      if (!Number.isInteger(inputValue)) {
        return;
      }

      if (inputValue <= 0 || inputValue >= 10) {
        return;
      }

      const sudokuCopy = JSON.parse(JSON.stringify(currentSudoku));

      sudokuCopy[row][col] = inputValue;

      const sudokuCopy2 = JSON.parse(JSON.stringify(sudokuCopy));

      //Check if input value is valid using isValid
      if (!isValid(sudokuCopy, inputValue, row, col)) {
        console.log('not valid');
        setNumberOfMistakes(prevNum => prevNum + 1);
        setPlaceholderValue('');
        return;
      }

      //Check if input value is valid using solve
      if (!solveSudoku(sudokuCopy)) {
        console.log('not solvable');
        setNumberOfMistakes(prevNum => prevNum + 1);
        setPlaceholderValue('');
        return;
      }

      //Check if sudokuCopy is finished
      if (sudokuIsSolved(sudokuCopy2)) {
        // Do something for finishing.
        const confettiSettings = {target: 'my-canvas', respawn: false, max: 300};
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
      }

      setCurValue(inputValue);
    }
    // 46 is del key.
    else if (x === 46) {
      setPlaceholderValue('');
    }
  };

  useEffect(() => {
    if (!currentSudoku) return;

    if (!currentSudoku[row]) return;

    const newSudoku = JSON.parse(JSON.stringify(currentSudoku));

    newSudoku[row][col] = curValue;

    setCurrentSudoku(newSudoku);
  }, [curValue, props.inputId, setCurrentSudoku, col, row]);

  let idx = row * 9 + col;
  let isOdd =
    ([0, 1, 2].includes(idx % 9) && idx < 21) ||
    ([6, 7, 8].includes(idx % 9) && idx < 27) ||
    ([3, 4, 5].includes(idx % 9) && idx > 27 && idx < 53) ||
    ([0, 1, 2].includes(idx % 9) && idx > 53) ||
    ([6, 7, 8].includes(idx % 9) && idx > 53);

  let inputValue = '';
  if (currentSudoku && currentSudoku[row] && currentSudoku[row][col] !== 0) {
    inputValue = currentSudoku[row][col];
  }

  return (
    <input
      type="number"
      min="1"
      max="9"
      className={`${props.className} ${styles.input} ${
        isOdd ? styles.odd : ''
      }`}
      value={inputValue}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      placeholder={placeholderValue}
    />
  );
};

export default SudokuInput;
