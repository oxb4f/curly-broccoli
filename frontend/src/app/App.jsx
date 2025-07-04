import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTopRoute from './router/components/ScrollToTopRoute';
import ProtectedRoute from './router/components/ProtectedRoute';

import SessionProvider from './providers/SessionProvider';
import { UserProvider } from './providers/UserProvider';
import { BookProvider } from './providers/BookProvider';

import QUERY_KEYS from './query/constants/queryKeys';
import ROUTES from './router/constants/routes';

import AppLayout from './layouts/Layout';
import SettingsLayout from '@settings/layouts/Layout';

import WelcomePage from '@auth/pages/Welcome';
import OwnProfilePage from '@user/own/pages/Profile';
import UserInfoSettingsPage from '@settings/pages/UserInfo';
import UserImageSettingsPage from '@settings/pages/UserImage';
import OthersProfilePage from '@user/others/pages/Profile';
import OtherUsersPage from '@user/others/pages/Users';
import BookPage from '@book/shared/pages/Book';
import BookCreatePage from '@book/own/pages/Create';
import BookEditPage from '@book/own/pages/Edit';
import BookReadPage from '@book/own/pages/Read';
import OthersBooksPage from '@book/others/pages/Books';
import EventsPage from '@features/events/pages/Events';
import FollowersPage from '@features/follows/pages/Followers';
import FollowingPage from '@features/follows/pages/Following';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider queryKey={QUERY_KEYS.USERS.OWN}>
        <BrowserRouter>
          <ScrollToTopRoute>
            <Routes>
              <Route path={ROUTES.AUTH.ROOT} element={<WelcomePage />} />
              <Route
                path={ROUTES.MAIN.ROOT}
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<EventsPage />} />
                <Route path={ROUTES.MAIN.PROFILE} element={<OwnProfilePage />} />
                <Route path={ROUTES.MAIN.BOOK.CREATE} element={<BookCreatePage />} />
                <Route
                  path={`${ROUTES.MAIN.BOOK.PRIVATE.ROOT}/:bookId`}
                  element={
                    <BookProvider queryKey={QUERY_KEYS.BOOKS.PRIVATE.BOOK}>
                      <Outlet />
                    </BookProvider>
                  }
                >
                  <Route index element={<BookPage />} />
                  <Route path={ROUTES.MAIN.BOOK.PRIVATE.EDIT} element={<BookEditPage />} />
                  <Route path={ROUTES.MAIN.BOOK.PRIVATE.READ} element={<BookReadPage />} />
                </Route>
                <Route
                  path={`${ROUTES.MAIN.BOOK.PUBLIC.ROOT}/:bookId`}
                  element={
                    <BookProvider queryKey={QUERY_KEYS.BOOKS.PUBLIC.BOOK} isPublic>
                      <Outlet />
                    </BookProvider>
                  }
                >
                  <Route index element={<BookPage />} />
                </Route>
                <Route path={ROUTES.MAIN.SEARCH} element={<OthersBooksPage />} />
                <Route path={ROUTES.MAIN.USERS} element={<OtherUsersPage />} />
                <Route path={`${ROUTES.MAIN.FOLLOWERS}/:userId`} element={<FollowersPage />} />
                <Route path={`${ROUTES.MAIN.FOLLOWINGS}/:userId`} element={<FollowingPage />} />
                <Route
                  path={`${ROUTES.MAIN.USERS}/:userId`}
                  element={
                    <UserProvider queryKey={QUERY_KEYS.USERS.OTHERS}>
                      <Outlet />
                    </UserProvider>
                  }
                >
                  <Route index element={<OthersProfilePage />} />
                </Route>
              </Route>
              <Route
                path={ROUTES.SETTINGS.ROOT}
                element={
                  <ProtectedRoute>
                    <SettingsLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={ROUTES.SETTINGS.PROFILE} replace />} />
                <Route path={ROUTES.SETTINGS.PROFILE} element={<UserInfoSettingsPage />} />
                <Route path={ROUTES.SETTINGS.PHOTO} element={<UserImageSettingsPage />} />

                {/* <Route path={ROUTES.SETTINGS.SECURITY} element={<SettingsSequrityPage />} /> */}
              </Route>
            </Routes>
          </ScrollToTopRoute>
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
