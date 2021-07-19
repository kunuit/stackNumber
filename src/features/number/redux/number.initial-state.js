export const initialState = Object.freeze({
  // loading
  showLoading: false,
  // handle
  pickerNumber: null,
  errorNumber: null,
  myNumbers: Object.freeze({
    list: [],
    pagination: null,
  }),
});
