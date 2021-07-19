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
          ...state.myNumbers,
          ...payload.data,
          pagination: payload.pagination,
        },
      };

    case TypeNumber.changeFields:
      return {
        ...state,
        ...payload.changeFields,
      };

    case TypeNumber.resetAll:
      return {
        // loading
        showLoading: false,
        // handle
        pickerNumber: null,
        errorNumber: null,
        myNumbers: Object.freeze({
          list: [],
          pagination: null,
        }),
      };

    default:
      return state;
  }
};

export default reducer;
