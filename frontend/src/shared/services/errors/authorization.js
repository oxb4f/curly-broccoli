import BaseError from './base';

export default class AuthorizationError extends BaseError {
  constructor(name, message, details) {
    super(name, message, details);
  }
}
