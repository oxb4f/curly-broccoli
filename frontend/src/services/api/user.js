import api from './api';
import { removeFromStorage, setToStorage } from '../storage/storage';

async function createUser(userData) {
  const response = await api.post('users', userData);
  setToStorage({ name: 'user', value: response });
  return response;
}

async function loginUser(userData) {
  const response = await api.post('users/login', userData);

  setToStorage({ name: 'user', value: response });

  return response;
}

function logoutUser() {
  removeFromStorage('user');
}

export { createUser, loginUser, logoutUser };
