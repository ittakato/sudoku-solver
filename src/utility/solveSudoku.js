// returns true/false
export const isValid = (board, num, row, col) => {
  // check row
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num && i !== row) {
      return false;
    }
  }

  // check col
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) {
      return false;
    }
  }

  // check subgrid
  let sRow = Math.floor(row / 3) * 3;
  let sCol = Math.floor(col / 3) * 3;
  for (let i = sRow; i < sRow + 3; i++) {
    for (let j = sCol; j < sCol + 3; j++) {
      if (board[i][j] === num && i !== row && j !== col) {
        return false;
      }
    }
  }

  return true;
};

export const findEmpty = board => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
};

export const solveSudoku = board => {
  let find = findEmpty(board);
  if (!find) {
    return true;
  }

  let i = find[0];
  let j = find[1];

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, num, i, j)) {
      board[i][j] = num;
      if (solveSudoku(board)) {
        return true;
      }
      board[i][j] = 0;
    }
  }

  return false;
};

// Check if all grids are filled
export const sudokuIsSolved = board => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
};

const printBoard = board => {
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0 && i !== 0) {
      console.log('------------');
    }

    let output = '';
    for (let j = 0; j < 9; j++) {
      if (j % 3 === 0 && j !== 0) {
        output += '|';
      }
      output += board[i][j];
    }
    console.log(output);
  }
};
