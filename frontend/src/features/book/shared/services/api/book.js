import api from '@shared/services/api/api';
import { prepareRequest, processResponse } from '@shared/utils';

const getPublicBook = async (id) => {
  const response = await api.get(`books/public/${id}`);
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

  const response = await api.get(`books/public/`, requestPayload);

  return processResponse(response, 'books');
};

const getPrivateBook = async (id) => {
  const response = await api.get(`books/private/${id}`);

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

  const response = await api.get(`books/private/`, requestPayload);

  return processResponse(response, 'books');
};

const quickSearchPublicBooks = async (params) => {
  const requestPayload = prepareRequest(params, 'books', 'quick-search');

  const response = await api.get('books/quick-search', requestPayload);

  return processResponse(response, 'books');
};

const createBook = async (inputData) => {
  const requestPayload = prepareRequest(inputData, 'books', 'create');
  await api.post('books', requestPayload);
};

const editBook = async (id, inputData) => {
  const requestPayload = prepareRequest(inputData, 'books', 'edit');

  const response = await api.patch(`books/private/${id}`, requestPayload);

  return processResponse(response, 'books');
};

const removeBook = async (id) => {
  await api.delete(`books/private/${id}`);
};

const addBook = async (id) => {
  const response = await api.post(`books/public/add/${id}`);

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
