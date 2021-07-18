import {initialState} from './room.initial-state';
import {TypeRoom} from './room.type';

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TypeRoom.changeFields:
      return {
        ...state,
        ...payload.changeFields,
      };
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
        rooms: {...state.rooms, ...payload.data},
      };
    default:
      return state;
  }
};

export default reducer;
