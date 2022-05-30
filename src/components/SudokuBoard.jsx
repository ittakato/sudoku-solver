import { useState, useContext, useEffect } from 'react';
import SudokuInput from './SudokuInput';

import styles from './SudokuBoard.module.css';

import { SudokuContext } from '../contexts/sudoku.context';
import { generateSudoku } from '../utility/generateSudoku';

// const board = [
//   [7, 8, 0, 4, 0, 0, 1, 2, 0],
//   [6, 0, 0, 0, 7, 5, 0, 0, 9],
//   [0, 0, 0, 6, 0, 1, 0, 7, 8],
//   [0, 0, 7, 0, 4, 0, 2, 6, 0],
//   [0, 0, 1, 0, 5, 0, 9, 3, 0],
//   [9, 0, 4, 0, 6, 0, 0, 0, 5],
//   [0, 7, 0, 3, 0, 0, 0, 1, 2],
//   [1, 2, 0, 0, 0, 7, 4, 0, 0],
//   [0, 4, 9, 2, 0, 6, 0, 0, 7],
// ];

const board = generateSudoku(40); // initial difficulty

const SudokuBoard = () => {
  const sudokuInputs = [];

  const { currentSudoku, setCurrentSudoku } = useContext(SudokuContext);

  useEffect(() => {
    setCurrentSudoku(board);
  }, [setCurrentSudoku]);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      sudokuInputs.push(
        <SudokuInput
          className={styles.sudokuInput}
          key={i * 9 + j}
          inputId={i * 9 + j}
          value={currentSudoku && currentSudoku[i] && currentSudoku[i][j]}
        />
      );
    }
  }

  return (
    <div id="sudoku" className={styles.sudoku}>
      {sudokuInputs}
    </div>
  );
};

export default SudokuBoard;
