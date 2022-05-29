import { createContext, useState } from 'react';

export const SudokuContext = createContext({
  currentSudoku: null,
  setCurrentSudoku: () => null,
  numberOfMistakes: null,
  setNumberOfMistakes: () => null,
  difficulty: null,
  setDifficulty: () => null,
});

export const SudokuProvider = ({ children }) => {
  const [currentSudoku, setCurrentSudoku] = useState([]);
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const [difficulty, setDifficulty] = useState(40); // 40-Easy, 45-Medium, 50-Hard

  const value = {
    currentSudoku,
    setCurrentSudoku,
    numberOfMistakes,
    setNumberOfMistakes,
    difficulty,
    setDifficulty,
  };

  return (
    <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
  );
};
