import { createContext, useState } from 'react';

export const SudokuContext = createContext({
  currentSudoku: null,
  setCurrentSudoku: () => null,
});

export const SudokuProvider = ({ children }) => {
  const [currentSudoku, setCurrentSudoku] = useState([]);

  const value = { currentSudoku, setCurrentSudoku };

  return (
    <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
  );
};
