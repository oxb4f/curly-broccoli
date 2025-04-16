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
    PROFILE: `${MAIN_ROOT}/profile`,
    BOOK: {
      ROOT: `/${BOOK_ROOT}`,
      PRIVATE: `/${BOOK_ROOT}/private`,
      PUBLIC: `/${BOOK_ROOT}/public`,
      CREATE: `/${BOOK_ROOT}/create`,
      EDIT: `/${BOOK_ROOT}/edit`,
      READ: `/${BOOK_ROOT}/read`
    },
    SEARCH: `${MAIN_ROOT}/search`
  },
  SETTINGS: {
    ROOT: `/${SETTINGS_ROOT}`,
    PROFILE: `/${SETTINGS_ROOT}/profile`,
    PHOTO: `/${SETTINGS_ROOT}/photo`,
    SECURITY: `/${SETTINGS_ROOT}/security`
  }
};

export default ROUTES;
