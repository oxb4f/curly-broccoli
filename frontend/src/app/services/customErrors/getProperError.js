import ValidationError from '../customErrors/validationError';
import AuthorisationError from '../customErrors/authorisationError';
import BaseError from '../customErrors/baseError';

export default function getProperError(error) {
  if (error.type === 'VALIDATION') {
    const validationError = ValidationError.from(error);

    return validationError;
  } else if (error.type === 'DUPLICATED' || error.type === 'AUTH') {
    const authorisationError = AuthorisationError.from(error);

    return authorisationError;
  }
  return BaseError.from(error);
}
