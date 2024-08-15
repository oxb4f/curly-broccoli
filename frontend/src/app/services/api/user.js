import api from './api';

async function createUser(userData) {
  const response = await api.post('users', { json: userData }).json();
  return response;
}

async function loginUser(userData) {
  const response = await api.post('users/login', { json: userData }).text();
  localStorage.setItem('user', response);
  console.log(response);
  const user = JSON.parse(localStorage.getItem('user'));
  Promise.all[
    (api
      .post(`accesses/${user.accessId}/refresh`, {
        json: { refresh: user.jwt.refresh }
      })
      .json(),
    api
      .post(`accesses/${user.accessId}/refresh`, {
        json: { refresh: user.jwt.refresh }
      })
      .json())
  ];
  return response;
}

export { createUser, loginUser };
