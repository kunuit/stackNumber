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
          list: {
            ...(payload.keepMyRooms ? state.rooms.list : {}),

            ...payload.data,
          },
          pagination: payload.pagination,
        },
        actionLoading: null,
      };

    case TypeRoom.increaseNumberSuccess:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          list: {
            ...state.rooms.list,
            [payload.data._id]: payload.data,
          },
        },
      };

    case TypeRoom.changeFields:
      return {
        ...state,
        ...payload.changeFields,
      };

    case TypeRoom.resetAll:
      return {
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
      };
    default:
      return state;
  }
};

export default reducer;
