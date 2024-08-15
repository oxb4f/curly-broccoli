import ky from 'ky';
import getProperError from '../customErrors/getProperError';
import { refreshToken } from './jwt';

const BASE_URL = import.meta.env.VITE_BASE_URL;
let refreshRequest = null;

export default ky.create({
  prefixUrl: BASE_URL,
  // headers: {
  //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).jwt.access}`
  // },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const user = localStorage.getItem('user');
        if (response.status === 401 && user) {
          const userData = JSON.parse(user);
          if (!refreshRequest) {
            refreshRequest = refreshToken;
          }
          const token = await refreshRequest(userData.accessId, userData.jwt.refresh);
          refreshRequest = null;
          request.headers.set('Authorization', `Bearer ${token}`);

          return ky(request);
        } else if (!response.ok) {
          response = await response.json();

          throw getProperError(response.error);
        }
      }
    ]
  }
});
