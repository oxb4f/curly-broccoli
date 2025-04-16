import api from './api';
import { prepareRequest, processResponse } from '../../utils/dataTransformers';

const getPublicBook = async (id) => {
  const response = await api.get(`books/public/${id}`);
  console.log(response);

  return processResponse(response, 'books');
};

const getPublicBooks = async (params = {}) => {
  const response = await api.get(`books/public/`, {
    params: {
      orderDirection: 'desc',
      orderField: 'createdAt',
      limit: 20,
      offset: 0,
      ...params
    }
  });
  console.log(response);

  return processResponse(response, 'books');
};

const getPrivateBook = async (id) => {
  const response = await api.get(`books/private/${id}`);
  console.log(response);

  return processResponse(response, 'books');
};

const getPrivateBooks = async (params = {}) => {
  const response = await api.get(`books/private/`, {
    params: {
      orderDirection: 'desc',
      orderField: 'updatedAt',
      limit: 20,
      offset: 0,
      ...params
    }
  });
  console.log(response);

  return processResponse(response, 'books');
};

const createBook = async (inputData) => {
  const requestPayload = prepareRequest(inputData, 'books', 'create');
  const response = await api.post('books', requestPayload);
  console.log(response);

  // return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const editBook = async (id, inputData) => {
  const requestPayload = prepareRequest(inputData, 'books', 'edit');
  console.log(requestPayload);

  const response = await api.patch(`books/private/${id}`, requestPayload);
  console.log(response);
  console.log(id);

  return response;

  // return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const removeBook = async (id) => {
  await api.delete(`books/private/${id}`);
};

const addBook = async (id) => {
  const response = await api.post(`books/public/add/${id}`);
  console.log(response);

  // return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

export {
  getPublicBooks,
  getPublicBook,
  getPrivateBooks,
  getPrivateBook,
  createBook,
  editBook,
  removeBook,
  addBook
};
