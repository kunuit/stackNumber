import axiosService from '@src/modules/axiosService';
import {API_ENDPOINT} from '@env';

const route = 'room';

export const getAllMyRoomAPI = () => {
  return axiosService.get(`${API_ENDPOINT}/${route}`);
};

export const createRoomAPI = ({name}) => {
  return axiosService.post(`${API_ENDPOINT}/${route}`, {name});
};
