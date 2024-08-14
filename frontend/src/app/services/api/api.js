import ky from 'ky';
import getProperError from '../customErrors/getProperError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          location.assign('/login');
        } else if (!response.ok) {
          response = await response.json();
          throw getProperError(response.error);
        }
      }
    ]
  },
  retry: {
    limit: 1
  }
});
