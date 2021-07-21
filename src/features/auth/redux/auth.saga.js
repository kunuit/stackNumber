import {
  takeEvery,
  put,
  call,
  takeLatest,
  select,
  all,
} from 'redux-saga/effects';

import {statusCode} from '@src/constants/api.constants';
import {typeAuths} from './auth.type';
import {TypeNumber} from '../../number/redux/number.type';
import {TypeRoom} from '../../room/redux/room.type';
import {
  loginAPI,
  registerAPI,
  setTokenHeaderService,
  logoutAPI,
} from '../modules/auth.api';
import {ActionLoading} from '@src/constants/loading.type';

function* initAuthSaga({payload}) {
  yield call(setTokenHeaderService, payload.token);
}

function* loginSaga(action) {
  // show loading and block button
  yield put({type: typeAuths.showAuthLoading});
  //call api
  const {message, success, data, errors} = yield call(loginAPI, action.payload);

  if (!!success) {
    // go to my profile
    yield put({
      type: typeAuths.loginSuccess,
      payload: {
        data,
      },
    });

    yield call(setTokenHeaderService, data.accessToken);

    yield put({
      type: TypeNumber.getAllMyNumber,
      payload: {
        actionLoading: ActionLoading.fetching,
      },
    });
    yield put({
      type: TypeRoom.getAllMyRoom,
      payload: {
        actionLoading: ActionLoading.fetching,
      },
    });
  } else {
    // res error
    yield put({
      type: typeAuths.loginFail,
      payload: {
        error: message,
      },
    });
  }
}

function* registerSaga(action) {
  // show loading and block button
  yield put({type: typeAuths.showRegisterLoading});
  //call api
  const {success, data, message} = yield call(registerAPI, action.payload);

  console.log(`message`, message);
  if (success) {
    // back to login or home
    yield put({
      type: typeAuths.registerSuccess,
      payload: {
        data,
      },
    });
  } else {
    // res error
    yield put({
      type: typeAuths.registerFail,
      payload: {
        error: message,
      },
    });
  }
}

function* logoutSaga() {
  const {success, data, message} = yield call(logoutAPI);

  if (success) {
    yield all([
      call(setTokenHeaderService, null),
      put({
        type: TypeRoom.resetAll,
      }),
      put({
        type: TypeNumber.resetAll,
      }),
    ]);
  }
}

export const authSagas = [
  takeLatest(typeAuths.login, loginSaga),
  takeLatest(typeAuths.register, registerSaga),
  takeLatest(typeAuths.logout, logoutSaga),
  takeEvery(typeAuths.initAuth, initAuthSaga),
];
