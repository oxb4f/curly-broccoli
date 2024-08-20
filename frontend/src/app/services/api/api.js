import axios from 'axios';
import getProperError from '../customErrors/getProperError';
import { refreshToken } from './jwt';
import { getFromStorage } from '../storage/storage';

const BASE_URL = import.meta.env.VITE_BASE_URL;
let refreshRequest = null;

const api = axios.create({
  baseURL: BASE_URL,
  transformResponse: [
    (data) => {
      try {
        data = JSON.parse(data);
        if (data.error) {
          return getProperError(data.error);
        }
        return data;
      } catch {
        return data;
      }
    }
  ]
});

api.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${getFromStorage('user')?.jwt?.access}`;
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const user = getFromStorage('user');

    if (error.response.status === 401 && user) {
      if (!refreshRequest) {
        refreshRequest = refreshToken(user.accessId, user.jwt.refresh).finally(() => {
          refreshRequest = null;
        });
      }
      await refreshRequest;

      return api(error.config);
    }
    throw error.response.data;
  }
);

export default api;
