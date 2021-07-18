import {all} from '@redux-saga/core/effects';

import {authSagas} from '@src/features/auth/redux/auth.saga';
import {numberSagas} from '@src/features/number/redux/number.saga';
import {RoomSagas} from '../features/room/redux/room.saga';

function* rootSaga() {
  yield all([...authSagas, ...numberSagas, ...RoomSagas]);
}

export default rootSaga;
