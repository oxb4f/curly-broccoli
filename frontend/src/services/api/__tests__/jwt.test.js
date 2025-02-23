import { describe, it, expect, vi, afterEach, beforeEach, afterAll } from 'vitest';
import { jwtApi, refreshToken } from '@/app/services/api/jwt';
import { getFromStorage, removeFromStorage, setToStorage } from '@/app/services/storage/storage';
import MockAdapter from 'axios-mock-adapter';
import api from '../api';

describe('jwt', () => {
  const mock = new MockAdapter(jwtApi);
  const mockApi = new MockAdapter(api);
  beforeEach(() => {
    setToStorage({
      name: 'user',
      value: { accessId: 1, jwt: { access: 'oldAccess', refresh: 'oldRefresh' } }
    });
  });
  afterEach(() => {
    removeFromStorage('user');
    vi.restoreAllMocks();
    mock.reset();
    mockApi.reset();
  });

  const mockRefreshResponse = {
    jwt: {
      access: 'newAccess',
      refresh: 'newRefresh'
    }
  };

  const mockResponse = {
    data: 'success'
  };

  const mockFailedRefreshResponse = {
    error: {
      type: 'AUTH',
      payload: {
        details: [],
        message: 'Authorization was failed'
      }
    }
  };

  describe('access token', () => {
    describe('if outdated', () => {
      it('should refresh token and retry request', async () => {
        const user = getFromStorage('user');
        mockApi
          .onPost('some-path', {
            data: 'someData'
          })
          .reply((config) => {
            if (config.headers.Authorization === `Bearer ${user.jwt.access}`)
              return [401, JSON.stringify(mockFailedRefreshResponse)];
            if (config.headers.Authorization === `Bearer ${mockRefreshResponse.jwt.access}`)
              return [200, JSON.stringify(mockResponse)];
            return [404];
          });

        mock
          .onPost(`accesses/${user.accessId}/refresh`, {
            refresh: user.jwt.refresh
          })
          .replyOnce(200, JSON.stringify(mockRefreshResponse));

        const response = await api.post(
          'some-path',
          {
            data: 'someData'
          },
          {
            headers: {
              Authorization: `Bearer ${user.jwt.access}`
            }
          }
        );
        expect(response).toEqual(mockResponse);
      });
    });
  });

  describe('refresh token', () => {
    describe('if successfully refreshed', () => {
      it('should captures token information and return new access', async () => {
        const user = getFromStorage('user');
        mock
          .onPost(`accesses/${user.accessId}/refresh`, {
            refresh: user.jwt.refresh
          })
          .reply((config) => {
            if (config.headers.Authorization === `Bearer ${user.jwt.access}`)
              return [200, JSON.stringify(mockRefreshResponse)];
          });

        const response = await refreshToken(user.accessId, user.jwt.refresh);

        expect(getFromStorage('user').jwt).toEqual(mockRefreshResponse.jwt);
        expect(response).toEqual(mockRefreshResponse.jwt.access);
      });
    });

    describe('if invalid data', () => {
      const OLD_LOCATION = window.location;

      beforeEach(() => {
        Object.defineProperty(window, 'location', {
          value: new URL('https://testurl.com/some-path'),
          writable: true
        });
      });

      afterAll(() => {
        Object.defineProperty(window, 'location', {
          value: OLD_LOCATION,
          writable: true
        });
      });
      it('should set location to url on failed auth', async () => {
        const REDIRECT_URL_ON_FAILED_AUTH = import.meta.env.VITE_LOGIN_ENDPOINT;
        const user = getFromStorage('user');
        mock
          .onPost(`accesses/${user.accessId}/refresh`, {
            refresh: user.jwt.refresh
          })
          .reply(401, JSON.stringify(mockFailedRefreshResponse));

        try {
          await refreshToken(user.accessId, user.jwt.refresh);
        } catch {
          expect(localStorage).not.toHaveProperty('user');
          expect(location.pathname).toEqual(REDIRECT_URL_ON_FAILED_AUTH);
        }
      });
    });

    describe('if two requests at the same time', () => {
      it('should consumes only one', async () => {
        const user = getFromStorage('user');
        mockApi
          .onPost('some-path', {
            data: 'someData'
          })
          .reply((config) => {
            if (config.headers.Authorization === `Bearer ${user.jwt.access}`)
              return [401, JSON.stringify(mockFailedRefreshResponse)];
            if (config.headers.Authorization === `Bearer ${mockRefreshResponse.jwt.access}`)
              return [200, JSON.stringify(mockResponse)];
            return [404];
          });

        mock
          .onPost(`accesses/${user.accessId}/refresh`, {
            refresh: user.jwt.refresh
          })
          .replyOnce(200, JSON.stringify(mockRefreshResponse));

        await Promise.all([
          api.post(
            'some-path',
            {
              data: 'someData'
            },
            {
              headers: {
                Authorization: `Bearer ${user.jwt.access}`
              }
            }
          ),
          api.post(
            'some-path',
            {
              data: 'someData'
            },
            {
              headers: {
                Authorization: `Bearer ${user.jwt.access}`
              }
            }
          )
        ]);

        expect(
          mock.history.post.filter(({ url }) => url === `accesses/${user.accessId}/refresh`).length
        ).toBe(1);
        // expect(response).toEqual(mockResponse);
      });
    });
  });
});
