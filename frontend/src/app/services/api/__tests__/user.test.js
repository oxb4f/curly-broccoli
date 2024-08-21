import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as user from '@/app/services/api/user';
import api from '@/app/services/api/api';
import { getFromStorage, removeFromStorage } from '@/app/services/storage/storage';
import MockAdapter from 'axios-mock-adapter';
import ValidationError from '../../customErrors/validationError';
import AuthorizationError from '../../customErrors/authorizationError';
import BaseError from '../../customErrors/baseError';

describe('user api', () => {
  const mock = new MockAdapter(api);
  afterEach(() => {
    removeFromStorage('user');
    vi.restoreAllMocks();
    mock.reset();
  });

  const mockRequest = {
    username: 'username',
    password: 'password'
  };
  const mockResponse = {
    access: 'access',
    refresh: 'refresh'
  };
  const mockInvalidRequest = {
    username: 'invalidUsername',
    password: 'invalidPassword'
  };
  const mockInvalidResponse = {
    error: {
      type: 'VALIDATION',
      payload: {
        message: 'Validation error',
        details: [
          {
            path: ['username'],
            message: 'String must contain at least 1 character(s)'
          },
          {
            path: ['password'],
            message: 'String must contain at least 8 character(s)'
          }
        ]
      }
    }
  };
  const mockDuplicatedResponse = {
    error: {
      type: 'DUPLICATED',
      payload: {
        message: 'User with this username already exists',
        details: [
          {
            path: ['username'],
            message: 'Not unique'
          }
        ]
      }
    }
  };
  const mockIncorrectResponse = {
    error: {
      type: 'AUTH',
      payload: {
        message: 'Invalid password',
        details: [
          {
            path: ['password'],
            message: 'Invalid password'
          }
        ]
      }
    }
  };
  const mockOtherErrorsResponse = {
    error: {}
  };

  describe('creating user', () => {
    describe('if successfully created', () => {
      it('should captures token information', async () => {
        mock.onPost('users', mockRequest).reply(200, JSON.stringify(mockResponse));

        const response = await user.createUser(mockRequest);

        expect(getFromStorage('user')).toEqual(mockResponse);
        expect(response).toEqual(mockResponse);
      });
    });

    describe('if validation failed', () => {
      beforeEach(() => {
        mock.onPost('users', mockInvalidRequest).reply(422, JSON.stringify(mockInvalidResponse));
      });
      it('should return custom validation error', async () => {
        try {
          await user.createUser(mockInvalidRequest);
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
        }
      });
      it('should not set any value in storage', async () => {
        try {
          await user.loginUser(mockInvalidRequest);
        } catch (error) {
          expect(localStorage).not.toHaveProperty('user');
        }
      });
    });

    describe('if duplicated', () => {
      beforeEach(() => {
        mock.onPost('users', mockInvalidRequest).reply(422, JSON.stringify(mockDuplicatedResponse));
      });
      it('should return custom validation error', async () => {
        try {
          await user.createUser(mockInvalidRequest);
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
        }
      });
      it('should not set any value in storage', async () => {
        try {
          await user.createUser(mockInvalidRequest);
        } catch (error) {
          expect(localStorage).not.toHaveProperty('user');
        }
      });
    });
    describe('if other errors', () => {
      beforeEach(() => {
        mock
          .onPost('users', mockInvalidRequest)
          .reply(400, JSON.stringify(mockOtherErrorsResponse));
      });
      it('should return custom base error', async () => {
        try {
          await user.createUser(mockInvalidRequest);
        } catch (error) {
          expect(error).toBeInstanceOf(BaseError);
        }
      });
    });
  });

  describe('logging user', () => {
    describe('if successfully logged in', () => {
      it('should captures token information', async () => {
        mock.onPost('users/login', mockRequest).reply(200, JSON.stringify(mockResponse));

        const response = await user.loginUser(mockRequest);
        expect(getFromStorage('user')).toEqual(mockResponse);
        expect(response).toEqual(mockResponse);
      });
    });

    describe('if validation failed', () => {
      beforeEach(() => {
        mock
          .onPost('users/login', mockInvalidRequest)
          .reply(422, JSON.stringify(mockInvalidResponse));
      });
      it('should return custom validation error', async () => {
        try {
          await user.loginUser(mockInvalidRequest);
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
        }
      });
      it('should not set any value in storage', async () => {
        try {
          await user.loginUser(mockInvalidRequest);
        } catch (error) {
          expect(localStorage).not.toHaveProperty('user');
        }
      });
    });

    describe('if some user data incorrect', () => {
      beforeEach(() => {
        mock
          .onPost('users/login', mockInvalidRequest)
          .reply(401, JSON.stringify(mockIncorrectResponse));
      });
      it('should return custom authorization error', async () => {
        try {
          await user.loginUser(mockInvalidRequest);
        } catch (error) {
          expect(error).toBeInstanceOf(AuthorizationError);
        }
      });
      it('should not set any value in storage', async () => {
        try {
          await user.loginUser(mockInvalidRequest);
        } catch (error) {
          expect(localStorage).not.toHaveProperty('user');
        }
      });
    });

    describe('if other errors', () => {
      beforeEach(() => {
        mock
          .onPost('users', mockInvalidRequest)
          .reply(400, JSON.stringify(mockOtherErrorsResponse));
      });
      it('should return custom base error', async () => {
        try {
          await user.createUser(mockInvalidRequest);
        } catch (error) {
          expect(error).toBeInstanceOf(BaseError);
        }
      });
    });
  });
});
