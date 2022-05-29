// Modified from https://www.geeksforgeeks.org/program-sudoku-generator/

// K is the number of missing digits
// Sudoku Generator
const fillValues = (mat, N, SRN, K) => {
  // Fill the diagonal of SRN x SRN matrices
  fillDiagonal(mat, N, SRN);

  // Fill remaining blocks
  fillRemaining(0, SRN, mat, N, SRN);

  // Remove Randomly K digits to make game
  removeKDigits(mat, N , K);
};

// Fill the diagonal SRN number of SRN x SRN matrices
const fillDiagonal = (mat, N, SRN) => {
  for (let i = 0; i < N; i = i + SRN)
    // for diagonal box, start coordinates->i==j
    fillBox(i, i, mat, N, SRN);
};

// Returns false if given 3 x 3 block contains num.

// Uses mat
const unUsedInBox = (rowStart, colStart, num, mat, SRN) => {
  for (let i = 0; i < SRN; i++)
    for (let j = 0; j < SRN; j++)
      if (mat[rowStart + i][colStart + j] === num) return false;

  return true;
};

// Fill a 3 x 3 matrix.

// Uses mat
const fillBox = (row, col, mat, N, SRN) => {
  let num;
  for (let i = 0; i < SRN; i++) {
    for (let j = 0; j < SRN; j++) {
      do {
        num = randomGenerator(N);
      } while (!unUsedInBox(row, col, num, mat, SRN));

      mat[row + i][col + j] = num;
    }
  }
};

// Random generator
const randomGenerator = num => {
  return Math.floor(Math.random() * num + 1);
};

// Check if safe to put in cell
const CheckIfSafe = (i, j, num, mat, N, SRN) => {
  return (
    unUsedInRow(i, num, mat, N) &&
    unUsedInCol(j, num, mat, N) &&
    unUsedInBox(i - (i % SRN), j - (j % SRN), num, mat, SRN)
  );
};

// check in the row for existence

// Uses mat
const unUsedInRow = (i, num, mat, N) => {
  for (let j = 0; j < N; j++) if (mat[i][j] === num) return false;
  return true;
};

// check in the row for existence

// Uses mat
const unUsedInCol = (j, num, mat, N) => {
  for (let i = 0; i < N; i++) if (mat[i][j] === num) return false;
  return true;
};

// A recursive function to fill remaining matrix

// Uses mat
const fillRemaining = (i, j, mat, N, SRN) => {
  if (j >= N && i < N - 1) {
    i = i + 1;
    j = 0;
  }
  if (i >= N && j >= N) return true;

  if (i < SRN) {
    if (j < SRN) j = SRN;
  } else if (i < N - SRN) {
    if (j === Math.floor(i / SRN) * SRN) j = j + SRN;
  } else {
    if (j === N - SRN) {
      i = i + 1;
      j = 0;
      if (i >= N) return true;
    }
  }

  for (let num = 1; num <= N; num++) {
    if (CheckIfSafe(i, j, num, mat, N, SRN)) {
      mat[i][j] = num;
      if (fillRemaining(i, j + 1, mat, N, SRN)) return true;

      mat[i][j] = 0;
    }
  }
  return false;
};

// Remove the K no. of digits to complete game

// Uses mat
const removeKDigits = (mat, N, K) => {
  let count = K;
  while (count !== 0) {
    let cellId = randomGenerator(N * N) - 1;

    // extract coordinates i  and j
    let i = Math.floor(cellId / N);
    let j = cellId % 9;
    if (j !== 0) j = j - 1;

    if (mat[i][j] !== 0) {
      count--;
      mat[i][j] = 0;
    }
  }
};

const printSudoku = (mat, N) => {
  for (let i = 0; i < N; i++) {
    let output = '';
    for (let j = 0; j < N; j++) output += mat[i][j] + ' ';
    console.log(output);
  }
  console.log();
};

export const generateSudoku = (K = 20) => {
  const N = 9; // number of columns/rows.
  const SRN = Math.floor(Math.sqrt(9)); // square root of N
  const mat = new Array(N);
  for (let i = 0; i < N; i++) {
    mat[i] = new Array(N);
    for (let j = 0; j < N; j++) {
      mat[i][j] = 0;
    }
  }

  fillValues(mat, N, SRN, K);

  return mat;
};

