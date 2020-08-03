import axios from 'axios';
import { API_URL } from './constants';

const Axios = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: localStorage.getItem('token')
        ? `Bearer ${localStorage.getItem('token')}`
        : null,
  },
});

export default Axios;

export const uploadFile = async (api, data) => {
  return await axios({
    method: 'POST',
    url: API_URL + api,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization':
        typeof window !== 'undefined' && localStorage.getItem('token')
          ? `Token ${localStorage.getItem('token')}`
          : null,
    },
  });
};
