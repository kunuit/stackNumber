export const convertDataSuccess = data => {
  const newData = data.reduce((obj, res, index) => {
    return {
      ...obj,
      list: {
        ...obj.list,
        [res._id]: res,
      },
    };
  }, {});

  return newData;
};
