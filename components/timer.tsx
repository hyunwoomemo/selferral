import React, { useEffect, useMemo, useRef, useState } from "react";

const Timer = ({ time, apiTime }) => {
  const [seconds, setSeconds] = useState(-1);
  const timeInterval = useRef(null);

  useEffect(() => {
    console.log("123", Date.now(), apiTime, Date.now() - apiTime);

    setSeconds(time - ((Date.now() - apiTime) / 1000).toFixed(0));
  }, [time]);

  useEffect(() => {
    if (seconds) {
      timeInterval.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timeInterval.current);
      };
    }
  }, [seconds]);

  console.log("seconds", seconds);

  const leftTime = useMemo(() => {
    if (seconds > 0) {
      const hour = Math.abs(parseInt(seconds / 3600));
      const minute = parseInt((seconds - hour * 3600) / 60);
      const second = seconds - hour * 3600 - minute * 60;

      console.log("hour", hour);
      console.log("minute", minute);
      console.log("second", second);

      if (hour > 0) {
        return `${hour}:${minute}:${second}`;
      } else {
        if (minute > 0) {
          return `${minute}:${second}`;
        } else {
          return `${second}`;
        }
      }
    }
  }, [seconds]);

  return <div className="px-2 py-[2px] bg-orange-50 text-orange-500 rounded-md text-sm">{leftTime}</div>;
};

export default Timer;
