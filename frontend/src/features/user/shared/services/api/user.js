import api from '@shared/services/api/api';
import { prepareRequest, processResponse } from '@shared/utils';

const getUser = async (id) => {
  const response = await api.get(`users/${id}`);

  return processResponse(response, 'users');
};

const getUsers = async (params) => {
  const requestPayload = prepareRequest(params, 'users', 'getAll');

  const response = await api.get('users', requestPayload);

  return processResponse(response, 'users');
};

const quickSearchUsers = async (params) => {
  const requestPayload = prepareRequest(params, 'users', 'quick-search');

  const response = await api.get('users/quick-search', requestPayload);

  return processResponse(response, 'users');
};

const createUser = async (inputData) => {
  const requestPayload = prepareRequest(inputData, 'users', 'signUp');
  const response = await api.post('users', requestPayload);

  return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const signInUser = async (inputData) => {
  const requestPayload = prepareRequest(inputData, 'users', 'signIn');
  const response = await api.post('users/login', requestPayload);

  return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const changeUserInfo = async (id, inputData) => {
  if (!id) return;

  const requestPayload = prepareRequest(inputData, 'users', 'changeInfo');

  const response = await api.patch(`/users/${id}`, requestPayload);

  return processResponse(response, 'users');
};

export { getUser, getUsers, createUser, signInUser, changeUserInfo, quickSearchUsers };
