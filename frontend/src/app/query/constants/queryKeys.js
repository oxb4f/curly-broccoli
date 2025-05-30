const USERS_ALL = 'users';
const BOOKS_ALL = 'books';
const EVENTS_ALL = 'events';
const READING_TRACKERS_ALL = 'reading-trackers';
const SEARCH_ALL = 'search';
const FOLLOWS_ALL = 'follows';
const REFERENCES_ALL = 'references';

const QUERY_KEYS = {
  USERS: {
    ALL: [USERS_ALL],
    OWN: [USERS_ALL, 'own'],
    OTHERS: [USERS_ALL, 'others']
  },
  BOOKS: {
    ALL: [BOOKS_ALL],
    PRIVATE: {
      ALL: [BOOKS_ALL, 'private'],
      LIST: [BOOKS_ALL, 'private', 'list'],
      BOOK: [BOOKS_ALL, 'private', 'book']
    },
    PUBLIC: {
      ALL: [BOOKS_ALL, 'public'],
      LIST: [BOOKS_ALL, 'public', 'list'],
      BOOK: [BOOKS_ALL, 'public', 'book']
    }
  },
  EVENTS: {
    ALL: [EVENTS_ALL]
  },
  FOLLOWS: {
    ALL: [FOLLOWS_ALL],
    FOLLOWERS: [FOLLOWS_ALL, 'followers'],
    FOLLOWING: [FOLLOWS_ALL, 'following']
  },
  SEARCH: {
    ALL: [SEARCH_ALL]
  },
  READING_TRACKERS: {
    ALL: [READING_TRACKERS_ALL],
    READING: [READING_TRACKERS_ALL, 'reading'],
    PAUSED: [READING_TRACKERS_ALL, 'paused'],
    FINISHED: [READING_TRACKERS_ALL, 'finished']
  },
  REFERENCES: {
    ALL: [REFERENCES_ALL]
  }
};

export default QUERY_KEYS;
