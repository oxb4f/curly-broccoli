import axios from 'axios';
import getProperError from '../errors/getProperError';
import { refreshToken } from './jwt';
import { getUserFromStorage, setUserToStorage } from '@shared/services/storage/user';

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
  const user = getUserFromStorage();
  const existingHeaders = config.headers ?? {};

  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...(user?.jwt?.access && { Authorization: `Bearer ${user.jwt.access}` }),
      ...existingHeaders
    },
    withCredentials: true
  };
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const user = getUserFromStorage();
    const originalRequest = error.config;
    // FIXME(artdain): rewrite this

    if (error.response.status === 401 && user) {
      if (!refreshRequest) {
        refreshRequest = refreshToken(user.accessId, user.jwt.refresh).finally(() => {
          refreshRequest = null;
        });
      }

      const newTokens = await refreshRequest;
      console.log(newTokens);

      const newUserData = { ...user, jwt: newTokens };

      setUserToStorage(newUserData);

      originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;

      const response = await api(originalRequest);

      return response;
    }

    throw error.response.data;
  }
);

export default api;
