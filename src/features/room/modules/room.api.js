import qs from 'query-string';
import axiosService from '@src/modules/axiosService';
import {API_ENDPOINT} from '@env';

const route = 'room';

export const getAllMyRoomAPI = (params = {}) => {
  let queryParams = '';
  if (Object.keys(params).length > 0) {
    queryParams = `?${qs.stringify(params)}`;
  }
  console.log(`queryParams`, queryParams);
  return axiosService.get(`${API_ENDPOINT}/${route}${queryParams}`);
};

export const createRoomAPI = ({name}) => {
  return axiosService.post(`${API_ENDPOINT}/${route}`, {name});
};

export const increaseNumberAPI = ({id}) => {
  return axiosService.post(`${API_ENDPOINT}/${route}/${id}`);
};
