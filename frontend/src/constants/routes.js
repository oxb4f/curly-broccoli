const ROUTES = {
  AUTH: {
    ROOT: '/auth'
  },
  MAIN: {
    ROOT: '/',
    PROFILE: '/profile',
    BOOK: {
      ROOT: '/book',
      ADD: '/book/add',
      EDIT: '/book/edit',
      READ: '/book/read'
    }
  },
  SETTINGS: {
    ROOT: '/settings',
    PROFILE: '/settings/profile',
    PHOTO: '/settings/photo',
    SECURITY: '/settings/security'
  }
};

export default ROUTES;
