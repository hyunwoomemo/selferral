export const throttle = (func, timer = 1000) => {
  let wait = false;

  return (...args) => {
    if (!wait) {
      func.apply(this, args);
      wait = true;

      setTimeout(() => {
        wait = false;
      }, timer);
    }
  };
};
