import api from '@shared/services/api/api';
import { prepareRequest, processResponse } from '@shared/utils';

const getPublicBook = async (id) => {
  const response = await api.get(`books/public/${id}`);
  console.log(response);

  return processResponse(response, 'books');
};

const getPublicBooks = async (params = {}) => {
  const requestPayload = prepareRequest(
    {
      orderDirection: 'desc',
      orderField: 'createdAt',
      limit: 15,
      offset: 0,
      ...params
    },
    'books',
    'get'
  );
  console.log(requestPayload);

  const response = await api.get(`books/public/`, requestPayload);
  console.log(response);

  return processResponse(response, 'books');
};

const getPrivateBook = async (id) => {
  const response = await api.get(`books/private/${id}`);
  console.log(response);

  return processResponse(response, 'books');
};

const getPrivateBooks = async (userId, params = {}) => {
  const requestPayload = prepareRequest(
    {
      userId,
      orderDirection: 'desc',
      orderField: 'updatedAt',
      limit: 15,
      offset: 0,
      ...params
    },
    'books',
    'get'
  );
  console.log(requestPayload);

  const response = await api.get(`books/private/`, requestPayload);
  console.log(response);

  return processResponse(response, 'books');
};

const quickSearchPublicBooks = async (params) => {
  const requestPayload = prepareRequest(params, 'books', 'quick-search');
  console.log(requestPayload);

  const response = await api.get('books/quick-search', requestPayload);
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

  return processResponse(response, 'books');

  // return { jwt: response.jwt, id: response.id, accessId: response.accessId };
};

const removeBook = async (id) => {
  console.log(id);

  await api.delete(`books/private/${id}`);
};

const addBook = async (id) => {
  const response = await api.post(`books/public/add/${id}`);
  console.log(response);

  return processResponse(response, 'books');
};

export {
  getPublicBooks,
  getPublicBook,
  getPrivateBooks,
  getPrivateBook,
  quickSearchPublicBooks,
  createBook,
  editBook,
  removeBook,
  addBook
};
