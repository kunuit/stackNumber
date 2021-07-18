import {takeEvery, call, put, takeLatest} from 'redux-saga/effects';
import {TypeRoom} from './room.type';
import {createRoomAPI, getAllMyRoomAPI} from '../modules/room.api';
import {convertDataSuccess} from '@src/modules/utils';

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
      },
    },
  });

  //call api
  const {data, message, success} = yield call(getAllMyRoomAPI);
  console.log(`{data,message,success}`, {data, message, success});

  if (success) {
    yield put({
      type: TypeRoom.getAllMyRoomSuccess,
      payload: {
        data: convertDataSuccess(data),
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

export const RoomSagas = [
  takeEvery(TypeRoom.createRoom, createRoomSaga),
  takeLatest(TypeRoom.getAllMyRoom, getAllMyRoomSaga),
];
