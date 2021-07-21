import qs from 'query-string';
import axiosService from '@src/modules/axiosService';
import {API_ENDPOINT} from '@env';

const route = 'number';

// API lấy danh mục cha
export const getNumberAPI = ({url}) => {
  return axiosService.get(`${url}`);
};

export const getAllMyNumberAPI = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  console.log(`queryParams`, queryParams);

  return axiosService.get(`${API_ENDPOINT}/${route}${queryParams}`);
};
