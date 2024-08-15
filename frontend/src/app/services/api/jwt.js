import ky from 'ky';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const REDIRECT_URL_ON_FAILED_AUTH = import.meta.env.VITE_LOGIN_ENDPOINT;

const jwtApi = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).jwt.access}`
  },
  hooks: {
    afterResponse: [
      (request, options, response) => {
        if (response.status === 401) location.assign(REDIRECT_URL_ON_FAILED_AUTH);
      }
    ]
  }
});

async function refreshToken(accessId, refreshToken) {
  const response = await jwtApi
    .post(`accesses/${accessId}/refresh`, {
      json: { refresh: refreshToken }
    })
    .json();

  const userData = JSON.parse(localStorage.getItem('user'));
  userData.jwt = response.jwt;
  localStorage.setItem('user', JSON.stringify(userData));

  console.log(response);

  return response.jwt.access;
}

export { refreshToken };
