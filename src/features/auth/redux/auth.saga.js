import {takeEvery, put, call, takeLatest, select} from 'redux-saga/effects';

import {statusCode} from '@src/constants/api.constants';
import {typeAuths} from './auth.type';
import {TypeNumber} from '../../number/redux/number.type';
import {TypeRoom} from '../../room/redux/room.type';
import {
  loginAPI,
  registerAPI,
  setTokenHeaderService,
} from '../modules/auth.api';

function* initAuthSaga({payload}) {
  yield call(setTokenHeaderService, payload.token);
}

function* loginSaga(action) {
  // show loading and block button
  yield put({type: typeAuths.showAuthLoading});
  //call api
  const {message, success, data, errors} = yield call(loginAPI, action.payload);

  console.log(`{message, success, data, errors}`, {
    message,
    success,
    data,
    errors,
  });

  if (!!success) {
    // go to my profile
    yield put({
      type: typeAuths.loginSuccess,
      payload: {
        data,
      },
    });

    yield call(setTokenHeaderService, data.accessToken);

    yield put({type: TypeNumber.getAllMyNumber});
    yield put({type: TypeRoom.getAllMyRoom});
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
  const {payload, code, message} = yield call(registerAPI, action.payload);

  console.log(`message`, message);
  if (code == statusCode.success) {
    // back to login or home
    yield put({
      type: typeAuths.registerSuccess,
      payload: {
        data: payload,
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
  console.log('logout in saga');
  yield call(setTokenHeaderService, null);
}

export const authSagas = [
  takeLatest(typeAuths.login, loginSaga),
  takeLatest(typeAuths.register, registerSaga),
  takeLatest(typeAuths.logout, logoutSaga),
  takeEvery(typeAuths.initAuth, initAuthSaga),
];
