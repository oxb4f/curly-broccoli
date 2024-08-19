import api from './api';
import { setToStorage } from '../storage/storage';
import { refreshToken } from './jwt';

async function createUser(userData) {
  const response = await api.post('users', userData);
  return response;
}

async function loginUser(userData) {
  const response = await api.post('users/login', userData);
  response.jwt.access = 'sdfasdf';
  setToStorage({ name: 'user', value: response });

  await api.post(
    `accesses/${response.accessId}/refresh`,
    { refresh: response.jwt.refresh },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.jwt?.access}`
      }
    }
  );

  return response;
}

export { createUser, loginUser };
