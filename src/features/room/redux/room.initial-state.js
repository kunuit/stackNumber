export const initialState = Object.freeze({
  // loading
  showLoading: false,
  actionLoading: null,
  // handle
  isCreated: false,
  errorCreatedRoom: null,
  errorIncreaseNumber: null,
  rooms: Object.freeze({
    list: [],
    pagination: {
      current: 0,
      limit: 0,
      total: 0,
    },
  }),
});
