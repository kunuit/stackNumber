import {takeEvery, call, put, takeLatest, select} from 'redux-saga/effects';
import {TypeNumber} from './number.type';
import {getNumberAPI, getAllMyNumberAPI} from '../modules/number.api';
import {convertDataSuccess} from '@src/modules/utils';
import {ActionLoading} from '@src/constants/loading.type';

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
  } else {
    yield put({
      type: TypeNumber.changeFields,
      payload: {
        changeFields: {
          showLoading: false,
          errorNumber: message,
        },
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
        actionLoading: payload.actionLoading,
      },
    },
  });

  const {pagination} = yield select(state => state.number.myNumbers);

  const {data, message, success} = yield call(
    getAllMyNumberAPI,
    payload.actionLoading === ActionLoading.loadMore
      ? {page: pagination.current + 1, sort: payload.sort}
      : !!payload.sort
      ? {sort: payload.sort}
      : {},
  );

  if (success) {
    yield put({
      type: TypeNumber.getAllMyNumberSuccess,
      payload: {
        data: convertDataSuccess(data.numbers),
        pagination: data.pagination,
        keepMyNumbers:
          payload.actionLoading === ActionLoading.loadMore ? true : false,
      },
    });
  } else {
    yield put({
      type: TypeNumber.changeFields,
      payload: {
        changeFields: {
          errorNumber: message,
        },
      },
    });
  }
}

export const numberSagas = [
  takeEvery(TypeNumber.getNumber, getNumberSaga),
  takeLatest(TypeNumber.getAllMyNumber, getAllMyNumberSaga),
];
