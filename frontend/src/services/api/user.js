import api from './api';
import { getUserFromStorage } from '../storage/user';
import { prepareRequest, processResponse } from '../../utils/dataTransformers';

const getUser = async () => {
  const userId = getUserFromStorage()?.id;
  console.log(userId);

  if (!userId) throw new Error('No user ID found');

  const response = await api.get(`users/${userId}`);
  console.log(response);

  return processResponse(response, 'users');
};

const createUser = async (userData) => {
  const preparedData = prepareRequest(userData, 'signUp');
  const response = await api.post('users', preparedData);

  return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const signInUser = async (userData) => {
  const preparedData = prepareRequest(userData, 'signIn');
  const response = await api.post('users/login', preparedData);
  console.log(response);

  return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const changeUserInfo = async (userData) => {
  const userId = getUserFromStorage()?.id;
  if (!userId) return;

  const preparedData = prepareRequest(userData, 'changeInfo');
  console.log(preparedData);

  const response = await api.patch(`/users/${userId}`, preparedData);

  return processResponse(response, 'users');
};

const uploadPhoto = async (userData) => {
  const preparedData = await prepareRequest(userData, 'uploadPhoto');
  console.log(preparedData);

  const response = await api.post('images', preparedData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return processResponse(response, 'images');
};

export { getUser, createUser, signInUser, changeUserInfo, uploadPhoto };
