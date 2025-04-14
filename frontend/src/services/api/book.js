import api from './api';
import { prepareRequest, processResponse } from '../../utils/dataTransformers';

const getPublicBook = async (id) => {
  const response = await api.get(`books/public/${id}`);
  console.log(response);

  return processResponse(response, 'books');
};

const getPublicBooks = async () => {
  const response = await api.get(`books/public/`);
  console.log(response);

  return response.books.map((book) => processResponse(book, 'books'));
};

const getPrivateBook = async (id) => {
  const response = await api.get(`books/private/${id}`);
  console.log(response);

  return processResponse(response, 'books');
};

const getPrivateBooks = async () => {
  const response = await api.get(`books/private/`);
  console.log(response);

  return { ...response, books: response.books.map((book) => processResponse(book, 'books')) };
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

export { getPublicBooks, getPublicBook, getPrivateBooks, getPrivateBook, createBook, editBook };
