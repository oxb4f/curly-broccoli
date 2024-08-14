import api from './api';

async function refreshToken(accessId, refreshToken) {
  const response = await api.post(`accesses/${accessId}/refresh`, { json: refreshToken }).json();
  console.log(response);

  return response;
}

export { refreshToken };
