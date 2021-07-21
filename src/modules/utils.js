export const convertDataSuccess = data => {
  const newData = data.reduce((obj, res, index) => {
    return {
      ...obj,
      [res._id]: res,
    };
  }, {});

  return newData;
};

export function debounce(fn, delay) {
  return args => {
    clearTimeout(fn.id);

    fn.id = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
}
