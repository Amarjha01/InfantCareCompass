import React, { useState, useEffect } from "react";

function Counter({ targetNumber = 0, duration = 1000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = targetNumber / (duration / 50);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        clearInterval(timer);
        setCount(targetNumber);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [targetNumber, duration]);

  return <>{count}</>;
}
export default Counter;