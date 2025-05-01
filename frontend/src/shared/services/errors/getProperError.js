import ValidationError from './validation';
import AuthorizationError from './authorization';
import BaseError from './base';

export default function getProperError(error) {
  if (error.type === 'VALIDATION' || error.type === 'DUPLICATED') {
    const validationError = ValidationError.from(error);

    return validationError;
  } else if (error.type === 'AUTH') {
    const authorizationError = AuthorizationError.from(error);

    return authorizationError;
  }
  return BaseError.from(error);
}
