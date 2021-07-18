// place combine all reducers
import {combineReducers} from 'redux';

// import productReducer from "./product.reducers";
import authReducer from '@features/auth/redux/auth.reducer';
import numberReducer from '@features/number/redux/number.reducer';
import roomReducer from '@features/room/redux/room.reducer';

const rootReducer = combineReducers({
  // products: productReducer,
  auth: authReducer,
  number: numberReducer,
  room: roomReducer,
});

export default rootReducer;
