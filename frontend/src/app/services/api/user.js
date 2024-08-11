import api from './api';

async function createUser(userData) {
  const response = await api.post('users', { json: userData }).json();
  return response;
}

export { createUser };
