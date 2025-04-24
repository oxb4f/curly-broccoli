const USERS_ALL = 'users';
const BOOKS_ALL = 'books';
const READING_TRACKERS_ALL = 'reading-trackers';

const QUERY_KEYS = {
  USERS: {
    ALL: [USERS_ALL]
  },
  BOOKS: {
    ALL: [BOOKS_ALL],
    PRIVATE: [BOOKS_ALL, 'private'],
    PUBLIC: [BOOKS_ALL, 'public']
  },
  READING_TRACKERS: {
    ALL: [READING_TRACKERS_ALL],
    READING: [READING_TRACKERS_ALL, 'reading'],
    PAUSED: [READING_TRACKERS_ALL, 'paused'],
    FINISHED: [READING_TRACKERS_ALL, 'finished']
  }
};

export default QUERY_KEYS;
