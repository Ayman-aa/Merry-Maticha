import { useState, useEffect } from 'react';
import { WORK_TIME, BREAK_TIME } from '../constants/pomodoroConstant';

export const useTimer = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 0) {
            setIsWorking(!isWorking);
            return isWorking ? BREAK_TIME : WORK_TIME;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timer !== null) {
      clearInterval(timer);
    }
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [isRunning, isWorking]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(isWorking ? WORK_TIME : BREAK_TIME);
  };

  return { time, isWorking, isRunning, startTimer, stopTimer, resetTimer };
};