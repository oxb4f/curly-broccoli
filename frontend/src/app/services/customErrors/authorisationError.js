import BaseError from '@app/services/customErrors/baseError';

export default class AuthorisationError extends BaseError {
  constructor(name, details) {
    super(name, details);
  }
}
