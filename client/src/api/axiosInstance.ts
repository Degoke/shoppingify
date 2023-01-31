import axios from 'axios';
import { URLS } from '../constants/urls';

const getToken = () => {
  const token = localStorage.getItem('user');
  if (!token) {
    return null;
  }
  return `Bearer ${token}`;
};

const axiosInstance = axios.create({
  baseURL: URLS.BASE_URI,
  headers: {
    authorization: getToken(),
  },
});

export default axiosInstance;
