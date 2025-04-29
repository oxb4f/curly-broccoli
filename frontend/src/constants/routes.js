const AUTH_ROOT = 'auth';
const MAIN_ROOT = '';
const BOOK_ROOT = 'book';
const SETTINGS_ROOT = 'settings';

const ROUTES = {
  AUTH: {
    ROOT: `/${AUTH_ROOT}`
  },
  MAIN: {
    ROOT: `/${MAIN_ROOT}`,
    PROFILE: `/profile`,
    BOOK: {
      ROOT: `/${BOOK_ROOT}`,
      PRIVATE: {
        ROOT: `/${BOOK_ROOT}/private`,
        EDIT: `edit`,
        READ: `read`
      },
      PUBLIC: { ROOT: `/${BOOK_ROOT}/public` },
      CREATE: `/${BOOK_ROOT}/create`
    },
    SEARCH: `/search`,
    USERS: `/users`
  },
  SETTINGS: {
    ROOT: `/${SETTINGS_ROOT}`,
    PROFILE: `profile`,
    PHOTO: `/${SETTINGS_ROOT}/photo`,
    SECURITY: `/${SETTINGS_ROOT}/security`
  }
};

export default ROUTES;
