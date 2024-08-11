import ky from 'ky';
import ValidationError from '../customErrors/validationError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          location.assign('/login?next=' + encodeURIComponent(location.pathname));
        } else if (!response.ok) {
          response = await response.json();
          if (response.error.type === 'VALIDATION') {
            const validationError = ValidationError.from(response.error);

            throw validationError;
          }
          return response;
        }
      }
    ]
  }
});
