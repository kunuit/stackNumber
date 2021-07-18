import axiosService from '@src/modules/axiosService';
import {API_ENDPOINT} from '@env';

const route = 'number';

// API lấy danh mục cha
export const getNumberAPI = ({url}) => {
  return axiosService.get(`${url}`);
};

export const getAllMyNumberAPI = () => {
  return axiosService.get(`${API_ENDPOINT}/${route}`);
};
