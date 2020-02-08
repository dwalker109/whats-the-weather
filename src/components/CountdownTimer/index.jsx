import React, { useState, useEffect } from "react";

const CountdownTimer = ({
  duration,
  updateFrequency = 1000,
  onFinished,
  loop = false
}) => {
  const [timer, setTimer] = useState(duration);

  /**
   * Set up a timer tick at the required frequency
   */
  useEffect(() => {
    const timerId = setInterval(
      () => setTimer(timer - updateFrequency),
      updateFrequency
    );

    return () => clearInterval(timerId);
  }, [timer, updateFrequency]);

  /**
   * Fire the timer finished callback and restart if required
   */
  useEffect(() => {
    if (timer < 0) {
      onFinished();
      if (loop) {
        setTimer(duration);
      }
    }
  }, [timer, onFinished, duration, loop]);

  return (
    <div className="ct">
      <span className="ct__ticker">Refreshing in {timer / 1000} seconds</span>
    </div>
  );
};

export default CountdownTimer;
