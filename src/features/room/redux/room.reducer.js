import {initialState} from './room.initial-state';
import {TypeRoom} from './room.type';

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TypeRoom.createRoomFail:
      return {
        ...state,
        errorCreatedRoom: payload.error,
      };

    case TypeRoom.createRoomSuccess:
      return {
        ...state,
        showLoading: false,
        rooms: {
          ...state.rooms,

          list: {
            ...state.rooms.list,
            [payload.data._id]: payload.data,
          },
        },
        isCreated: true,
      };

    case TypeRoom.getAllMyRoomSuccess:
      return {
        ...state,
        showLoading: false,
        rooms: {
          ...state.rooms,
          ...payload.data,
          pagination: payload.pagination,
        },
      };

    case TypeRoom.changeFields:
      return {
        ...state,
        ...payload.changeFields,
      };

    case TypeRoom.resetAll:
      return {
        ...state,
        // loading
        showLoading: false,
        // handle
        isCreated: false,
        errorCreatedRoom: null,
        rooms: Object.freeze({
          list: [],
          pagination: null,
        }),
      };
    default:
      return state;
  }
};

export default reducer;
