import {role} from '../modules/auth.modal';
import {initState} from './auth.initial-state';
import {typeAuths} from './auth.type';

const reducer = (state = initState, action) => {
  switch (action.type) {
    case typeAuths.registerSuccess:
      return {
        ...state,
        isRegister: true,
        isRegisterLoading: false,
      };
    case typeAuths.registerFail:
      return {
        ...state,
        errorRegister: action.payload.error,
        isRegisterLoading: false,
      };
    case typeAuths.resetRegister:
      return {
        ...state,
        isRegister: false,
        errorRegister: null,
      };
    case typeAuths.loginSuccess:
      return {
        ...state,
        token: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        info: action.payload.data,

        isLogin: true,
        isAuthLoading: false,
        isRequireLogin: false,
      };
    case typeAuths.loginFail:
      return {
        ...state,
        errorLogin: action.payload.error,
        isAuthLoading: false,
      };
    case typeAuths.logout:
      return {
        ...state,
        token: null,
        refreshToken: null,
        isLogin: false,
        isAdminLogin: false,
        errorLogin: null,
        dataCustomer: null,
        dataAdmin: null,
        isAdmin: false,
      };
    case typeAuths.showAuthLoading:
      return {
        ...state,
        isAuthLoading: true,
      };
    case typeAuths.showRegisterLoading:
      return {
        ...state,
        isRegisterLoading: true,
      };
    case typeAuths.refreshTokenSuccess:
      return {
        ...state,
        token: action.payload.data.accessToken,
      };
    case typeAuths.refreshTokenFail:
      return {
        ...state,
        errorLogin: action.payload.error,
      };
    case typeAuths.requireLogin:
      return {
        ...state,
        isRequireLogin: action.payload.statusRequireLogin,
      };
    case typeAuths.changeFields:
      return {
        ...state,
        ...action.payload.changeFields,
      };
    default:
      return state;
  }
};

export default reducer;
