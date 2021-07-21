export const initialState = Object.freeze({
  // loading
  showLoading: false,
  actionLoading: null,
  // handle
  pickerNumber: null,
  errorNumber: null,
  myNumbers: Object.freeze({
    list: [],
    pagination: {
      current: 0,
      limit: 0,
      total: 0,
    },
  }),
});
