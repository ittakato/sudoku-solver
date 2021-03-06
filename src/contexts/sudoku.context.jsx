import { createContext, useState } from 'react';

export const SudokuContext = createContext({
  currentSudoku: null,
  setCurrentSudoku: () => null,
  numberOfMistakes: null,
  setNumberOfMistakes: () => null,
  difficulty: null,
  setDifficulty: () => null,
  timerIsOn: null,
  setTimerIsOn: () => null,
  seconds: null,
  setSeconds: () => null,
  minutes: null,
  setMinutes: () => null,
  hours: null,
  setHours: () => null,
});

export const SudokuProvider = ({ children }) => {
  const [currentSudoku, setCurrentSudoku] = useState([]);
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const [difficulty, setDifficulty] = useState(40); // 40-Easy, 45-Medium, 50-Hard
  const [timerIsOn, setTimerIsOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const value = {
    currentSudoku,
    setCurrentSudoku,
    numberOfMistakes,
    setNumberOfMistakes,
    difficulty,
    setDifficulty,
    timerIsOn,
    setTimerIsOn,
    seconds,
    setSeconds,
    minutes,
    setMinutes,
    hours,
    setHours,
  };

  return (
    <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
  );
};
