export const initialState = Object.freeze({
  // loading
  showLoading: false,
  // handle
  isCreated: false,
  errorCreatedRoom: null,
  rooms: Object.freeze({
    list: [],
    pagination: null,
  }),
});
