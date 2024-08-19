import axios from 'axios';
import { getFromStorage, setToStorage } from '../storage/storage';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const REDIRECT_URL_ON_FAILED_AUTH = import.meta.env.VITE_LOGIN_ENDPOINT;

const jwtApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.jwt?.access}`
  }
  // hooks: {
  //   afterResponse: [
  //     (request, options, response) => {
  //       if (response.status === 401) location.assign(REDIRECT_URL_ON_FAILED_AUTH);
  //     }
  //   ]
  // }
});

jwtApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) location.assign(REDIRECT_URL_ON_FAILED_AUTH);
  }
);

async function refreshToken(accessId, refreshToken) {
  const response = await jwtApi.post(`accesses/${accessId}/refresh`, { refresh: refreshToken });

  const userData = getFromStorage('user');
  userData.jwt = response.jwt;
  setToStorage({ name: 'user', value: userData });

  console.log(response);

  return response.jwt.access;
}

export { refreshToken };
