import BaseError from '@app/services/customErrors/baseError';

export default class AuthorizationError extends BaseError {
  constructor(name, message, details) {
    super(name, message, details);
  }
}