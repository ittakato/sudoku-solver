import React, { useEffect, useState, useRef } from 'react';

import styles from './Timer.module.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isOn) {
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
  }, [isOn,minutes,seconds]);

  const startTimer = () => {
    setIsOn(true);
  }

  const stopTimer = () => {
    setIsOn(false);
  };

  const resetTimer = () => {
    setIsOn(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div className={styles.timerContainer}>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
      <h1 className={styles.timerContents}>
        Time: &nbsp;
        {hours === 0 ? '' : '0' + hours + ':'}
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </h1>
    </div>
  );
};

export default Timer;
