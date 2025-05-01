import BaseError from './base';

export default class ValidationError extends BaseError {
  constructor(name, message, details) {
    super(name, message, details);
  }
}
