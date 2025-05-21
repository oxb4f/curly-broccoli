const USERS_ALL = 'users';
const BOOKS_ALL = 'books';
const EVENTS_ALL = 'events';
const READING_TRACKERS_ALL = 'reading-trackers';
const SEARCH_ALL = 'search';
const FOLLOWS_ALL = 'follows';

const QUERY_KEYS = {
  USERS: {
    ALL: [USERS_ALL],
    OWN: [USERS_ALL, 'own'],
    OTHERS: [USERS_ALL, 'others']
  },
  BOOKS: {
    ALL: [BOOKS_ALL],
    PRIVATE: [BOOKS_ALL, 'private'],
    PUBLIC: [BOOKS_ALL, 'public']
  },
  EVENTS: {
    ALL: [EVENTS_ALL]
  },
  FOLLOWS: {
    ALL: [FOLLOWS_ALL],
    FOLLOWERS: [FOLLOWS_ALL, 'followers'],
    FOLLOWING: [FOLLOWS_ALL, 'following'],
    COUNT: [FOLLOWS_ALL, 'count']
  },
  SEARCH: {
    ALL: [SEARCH_ALL]
  },
  READING_TRACKERS: {
    ALL: [READING_TRACKERS_ALL],
    READING: [READING_TRACKERS_ALL, 'reading'],
    PAUSED: [READING_TRACKERS_ALL, 'paused'],
    FINISHED: [READING_TRACKERS_ALL, 'finished']
  }
};

export default QUERY_KEYS;
