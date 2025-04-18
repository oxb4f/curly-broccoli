const USERS_ALL = 'users';
const BOOKS_ALL = 'books';

const QUERY_KEYS = {
  USERS: {
    ALL: [USERS_ALL]
  },
  BOOKS: {
    ALL: [BOOKS_ALL],
    PRIVATE: [BOOKS_ALL, 'private'],
    PUBLIC: [BOOKS_ALL, 'public']
  }
};

export default QUERY_KEYS;
