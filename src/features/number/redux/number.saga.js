import {takeEvery, call, put, takeLatest, select} from 'redux-saga/effects';
import {TypeNumber} from './number.type';
import {getNumberAPI, getAllMyNumberAPI} from '../modules/number.api';
import {
  convertDataSuccess,
  pickerNumberWithCondition,
} from '@src/modules/utils';
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

function* catchMyNumberComingSaga({payload}) {
  const {roomId} = payload;

  const {list} = yield select(state => state.number.myNumbers);

  console.log(`list, Object.values(list)`, list, Object.values(list));

  const myCameNumber = Object.values(list).reduce((obj, res) => {
    console.log(`obj, res`, obj, res);
    if (res.idRoom._id === roomId) {
      return {
        ...obj,
        [res._id]: {...res, idRoom: {...res.idRoom, currentNumber: res.number}},
      };
    }
    return obj;
  }, {});

  yield put({
    type: TypeNumber.changeMyNumberFields,
    payload: {
      data: myCameNumber,
    },
  });
}

function* changePickerFieldSaga({payload}) {
  const {idRoom} = payload;

  const {success, data, message} = yield call(getAllMyNumberAPI, {idRoom});
  if (success) {
    yield put({
      type: TypeNumber.changeFields,
      payload: {changeFields: {pickerNumber: data.numbers[0]}},
    });
  } else {
    yield put({
      type: TypeNumber.changeFields,
      payload: {changeFields: {errorNumber: message}},
    });
  }
}

export const numberSagas = [
  takeEvery(TypeNumber.getNumber, getNumberSaga),
  takeLatest(TypeNumber.getAllMyNumber, getAllMyNumberSaga),
  takeEvery(TypeNumber.catchMyNumberComing, catchMyNumberComingSaga),
  takeEvery(TypeNumber.changePickerField, changePickerFieldSaga),
];
