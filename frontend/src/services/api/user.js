import api from './api';
import { prepareRequest, processResponse } from '../../utils/dataTransformers';

const getUser = async (id) => {
  console.log(id);

  if (!id) throw new Error('No user ID found');

  const response = await api.get(`users/${id}`);
  console.log(response);

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
  console.log(response);

  return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const changeUserInfo = async (id, inputData) => {
  if (!id) return;

  const requestPayload = prepareRequest(inputData, 'users', 'changeInfo');
  console.log(requestPayload);

  const response = await api.patch(`/users/${id}`, requestPayload);

  return processResponse(response, 'users');
};

export { getUser, createUser, signInUser, changeUserInfo };
