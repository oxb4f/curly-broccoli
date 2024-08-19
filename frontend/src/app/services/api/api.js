import axios from 'axios';
import getProperError from '../customErrors/getProperError';
import { refreshToken } from './jwt';

const BASE_URL = import.meta.env.VITE_BASE_URL;
let refreshRequest = null;

const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).jwt.access}`
  // },
  transformResponse: [
    (data) => {
      data = JSON.parse(data);
      if (data.error) {
        return getProperError(data.error);
      }
      return data;
    }
  ]
  // hooks: {
  //   afterResponse: [
  //     async (request, options, response) => {
  //       const user = localStorage.getItem('user');
  //       if (response.status === 401 && user) {
  //         const userData = JSON.parse(user);
  //         if (!refreshRequest) {
  //           refreshRequest = refreshToken;
  //         }
  //         const token = await refreshRequest(userData.accessId, userData.jwt.refresh);
  //         refreshRequest = null;
  //         request.headers.set('Authorization', `Bearer ${token}`);

  //         return axios(request);
  //       } else if (!response.ok) {
  //         response = await response.json();

  //         throw getProperError(response.error);
  //       }
  //     }
  //   ]
  // }
});

api.interceptors.response.use(
  function (response) {
    console.log(response);
    return response.data;
  },
  async function (error) {
    console.log(error);
    const user = localStorage.getItem('user');
    if (error.response.status === 401 && user) {
      const userData = JSON.parse(user);
      if (!refreshRequest) {
        refreshRequest = refreshToken;
      }
      console.log('refreshing...');

      const token = await refreshRequest(userData.accessId, userData.jwt.refresh);
      refreshRequest = null;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      error.config.headers.Authorization = `Bearer ${token}`;

      return axios(error.config);
    }
    throw error.response.data;
  }
);

export default api;
