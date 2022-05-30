import React, { useEffect, useState, useContext } from 'react';

import { SudokuContext } from '../../contexts/sudoku.context';

import play from '../../images/play.png';
import pause from '../../images/pause.png';
import reset from '../../images/reset.png';

import styles from './Timer.module.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  // const [isOn, setIsOn] = useState(true);

  const { timerIsOn, setTimerIsOn } = useContext(SudokuContext);

  useEffect(() => {
    let interval = null;

    if (timerIsOn) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);

        if (minutes === 59 && seconds === 59) {
          setHours(hours => hours + 1);
          setMinutes(0);
          setSeconds(0);
        } else if (seconds === 59) {
          setMinutes(minutes => minutes + 1);
          setSeconds(0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerIsOn, minutes, seconds]);

  const startTimer = () => {
    setTimerIsOn(true);
  };

  const stopTimer = () => {
    setTimerIsOn(false);
  };

  const resetTimer = () => {
    setTimerIsOn(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerContentsContainer}>
        <h1 className={styles.timerContents}>
          {hours === 0 ? '' : '0' + hours + ':'}
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </h1>
      </div>
      <button onClick={startTimer}>
        <img src={play} alt="Play Icon" width="25px" />
        <br />
        Resume
      </button>
      <button onClick={stopTimer}>
        <img src={pause} alt="Pause Icon" width="25px" />
        <br />
        Pause
      </button>
      <button onClick={resetTimer}>
        <img src={reset} alt="Reset Icon" width="25px" />
        <br />
        Reset
      </button>
    </div>
  );
};

export default Timer;
