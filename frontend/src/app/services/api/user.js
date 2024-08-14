import api from './api';

async function createUser(userData) {
  const response = await api.post('users', { json: userData }).json();
  return response;
}

async function loginUser(userData) {
  const response = await api.post('users/login', { json: userData }).text();
  localStorage.setItem('user', response);
  console.log(response);

  return response;
}

export { createUser, loginUser };
