import {initialState} from './number.initial-state';
import {TypeNumber} from './number.type';

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TypeNumber.changeFields:
      return {
        ...state,
        ...payload.changeFields,
      };

    case TypeNumber.getNumberSuccess:
      return {
        ...state,
        myNumbers: {
          ...state.myNumbers,
          list: {
            ...state.myNumbers.list,
            [payload.data._id]: payload.data,
          },
        },
        showLoading: false,
        pickerNumber: payload.data,
      };

    case TypeNumber.getAllMyNumberSuccess:
      return {
        ...state,
        showLoading: false,
        myNumbers: {...state.myNumbers, ...payload.data},
      };

    default:
      return state;
  }
};

export default reducer;
