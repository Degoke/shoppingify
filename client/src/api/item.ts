import { URLS } from '../constants/urls';
import axiosInstance from './axiosInstance';

export async function getItems() {
  try {
    const result = await axiosInstance.get(URLS.BASE_URI + URLS.GET_ALL_ITEMS);
    return result.data;
  } catch (error) {
    throw error;
  }
}
