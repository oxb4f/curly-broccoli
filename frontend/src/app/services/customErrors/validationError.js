import BaseError from '@app/services/customErrors/baseError';

export default class ValidationError extends BaseError {
  constructor(name, details) {
    super(name, details);
  }
}
