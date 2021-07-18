import {takeEvery, call, put, takeLatest} from 'redux-saga/effects';
import {TypeNumber} from './number.type';
import {getNumberAPI, getAllMyNumberAPI} from '../modules/number.api';
import {convertDataSuccess} from '@src/modules/utils';

function* getNumberSaga({payload}) {
  // show loading
  yield put({
    type: TypeNumber.changeFields,
    payload: {
      changeFields: {
        showLoading: true,
      },
    },
  });

  const {data, message, success} = yield call(getNumberAPI, {url: payload.url});

  console.log(`{data, message, success}`, {data, message, success});

  if (success) {
    yield put({
      type: TypeNumber.getNumberSuccess,
      payload: {
        data,
      },
    });
  }
}

function* getAllMyNumberSaga({payload}) {
  // show loading
  yield put({
    type: TypeNumber.changeFields,
    payload: {
      changeFields: {
        showLoading: true,
      },
    },
  });

  const {data, message, success} = yield call(getAllMyNumberAPI);

  if (success) {
    yield put({
      type: TypeNumber.getAllMyNumberSuccess,
      payload: {
        data: convertDataSuccess(data),
      },
    });
  }
}

export const numberSagas = [
  takeEvery(TypeNumber.getNumber, getNumberSaga),
  takeLatest(TypeNumber.getAllMyNumber, getAllMyNumberSaga),
];
