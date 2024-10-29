export const debounce = (func, timeout = 1000) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

// export function debounce(
//   func,
//   timeout: number = 200,
// ){
//   let timer;
//   return function (this, ...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }
