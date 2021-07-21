import {takeEvery, call, put, takeLatest, select} from 'redux-saga/effects';
import {TypeRoom} from './room.type';
import {
  createRoomAPI,
  getAllMyRoomAPI,
  increaseNumberAPI,
} from '../modules/room.api';
import {convertDataSuccess} from '@src/modules/utils';
import {ActionLoading} from '@src/constants/loading.type';

function* createRoomSaga({payload}) {
  // show loading
  yield put({
    type: TypeRoom.changeFields,
    payload: {
      changeFields: {
        showLoading: true,
      },
    },
  });

  const {data, message, success} = yield call(createRoomAPI, {
    name: payload.name,
  });

  console.log(`{data, message, success}`, {data, message, success});
  if (success) {
    yield put({
      type: TypeRoom.createRoomSuccess,
      payload: {
        data,
      },
    });
  } else {
    yield put({
      type: TypeRoom.createRoomFail,
      payload: {
        error: message,
      },
    });
  }
}

function* getAllMyRoomSaga({payload}) {
  // show loading
  yield put({
    type: TypeRoom.changeFields,
    payload: {
      changeFields: {
        showLoading: true,
        actionLoading: payload.actionLoading,
      },
    },
  });

  const {pagination} = yield select(state => state.room.rooms);

  //call api
  const {data, message, success} = yield call(
    getAllMyRoomAPI,
    payload.actionLoading === ActionLoading.loadMore
      ? {page: pagination.current + 1, sort: payload.sort}
      : !!payload.sort
      ? {sort: payload.sort}
      : {},
  );

  if (success) {
    yield put({
      type: TypeRoom.getAllMyRoomSuccess,
      payload: {
        data: convertDataSuccess(data.rooms),
        pagination: data.pagination,
        keepMyRooms:
          payload.actionLoading === ActionLoading.loadMore ? true : false,
      },
    });
  } else {
    yield put({
      type: TypeRoom.getAllMyRoomFail,
      payload: {
        error: message,
      },
    });
  }
}

function* increaseNumberSaga({payload}) {
  const {data, message, success} = yield call(increaseNumberAPI, {
    id: payload.id,
  });
  if (success) {
    yield put({
      type: TypeRoom.increaseNumberSuccess,
      payload: {
        data,
      },
    });
  } else {
    yield put({
      type: TypeRoom.changeFields,
      payload: {
        changeFields: {
          errorIncreaseNumber: message,
        },
      },
    });
  }
}

export const RoomSagas = [
  takeEvery(TypeRoom.createRoom, createRoomSaga),
  takeLatest(TypeRoom.getAllMyRoom, getAllMyRoomSaga),
  takeEvery(TypeRoom.increaseNumber, increaseNumberSaga),
];
