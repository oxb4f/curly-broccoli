import axios from 'axios';
import { getUserFromStorage, removeUserFromStorage } from '../storage/user';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const jwtApi = axios.create({
  baseURL: BASE_URL
});

jwtApi.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${getUserFromStorage()?.jwt?.access}`;
  return config;
});

jwtApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      removeUserFromStorage();
    }

    throw error.response.data;
  }
);

async function refreshToken(accessId, refreshToken) {
  const response = await jwtApi.post(`accesses/${accessId}/refresh`, { refresh: refreshToken });

  // const userData = getFromStorage('user');
  // console.log(response);

  return response.jwt;
}

export { jwtApi, refreshToken };
