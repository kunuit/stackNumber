import {initialState} from './number.initial-state';
import {TypeNumber} from './number.type';

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TypeNumber.getNumberSuccess:
      return {
        ...state,
        myNumbers: {
          ...state.myNumbers,
          list: {
            [payload.data._id]: payload.data,
            ...state.myNumbers.list,
          },
        },
        showLoading: false,
        pickerNumber: payload.data,
      };

    case TypeNumber.getAllMyNumberSuccess:
      return {
        ...state,
        showLoading: false,
        myNumbers: {
          list: {
            ...(payload.keepMyNumbers ? state.myNumbers.list : {}),

            ...payload.data,
          },
          pagination: payload.pagination,
        },
        actionLoading: null,
      };

    case TypeNumber.changeMyNumberFields:
      return {
        ...state,
        myNumbers: {
          ...state.myNumbers,
          list: {
            ...state.myNumbers.list,

            ...payload.data,
          },
        },
      };

    case TypeNumber.changeFields:
      console.log(`object`, payload.changeFields);
      return {
        ...state,
        ...payload.changeFields,
      };

    case TypeNumber.resetAll:
      return {
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
      };

    default:
      return state;
  }
};

export default reducer;
