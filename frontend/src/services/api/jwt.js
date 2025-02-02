import axios from 'axios';
import { getFromStorage, setToStorage } from '../storage/storage';
import { logoutUser } from './user';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const REDIRECT_URL_ON_FAILED_AUTH = import.meta.env.VITE_LOGIN_ENDPOINT;

const jwtApi = axios.create({
  baseURL: BASE_URL
});

jwtApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${getFromStorage('user')?.jwt?.access}`;
  return config;
});

jwtApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      logoutUser();
      location.pathname = REDIRECT_URL_ON_FAILED_AUTH;
    }

    throw error.response.data;
  }
);

async function refreshToken(accessId, refreshToken) {
  const response = await jwtApi.post(`accesses/${accessId}/refresh`, { refresh: refreshToken });

  const userData = getFromStorage('user');

  userData.jwt = response.jwt;

  setToStorage({ name: 'user', value: userData });

  return response.jwt.access;
}

export { jwtApi, refreshToken };
