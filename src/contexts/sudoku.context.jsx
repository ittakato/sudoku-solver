import { createContext, useState } from 'react';

export const SudokuContext = createContext({
  currentSudoku: null,
  setCurrentSudoku: () => null,
  numberOfMistakes: null,
  setNumberOfMistakes: null,
});

export const SudokuProvider = ({ children }) => {
  const [currentSudoku, setCurrentSudoku] = useState([]);
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);

  const value = { currentSudoku, setCurrentSudoku, numberOfMistakes, setNumberOfMistakes };

  return (
    <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
  );
};
