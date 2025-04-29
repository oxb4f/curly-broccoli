import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import WelcomePage from './pages/Welcome/Welcome.jsx';
import MainPage from './pages/Main/Main.jsx';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import OwnProfilePage from './pages/Main/Profile/Own/Own.jsx';
import SettingsPage from './pages/Settings/Settings.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SettingsProfilePage from './pages/Settings/Profile/Profile.jsx';
import ROUTES from './constants/routes.js';
import ProtectedRoute from './components/core/ProtectedRoute/ProtectedRoute.jsx';
import ScrollToTopRouter from './components/core/ScrollToTopRouter/ScrollToTopRouter.jsx';
import SessionProvider from './components/core/SessionProvider/SessionProvider.jsx';
import SettingsPhotoPage from './pages/Settings/Photo/Photo.jsx';
import BookPage from './pages/Main/Book/Book.jsx';
import BookCreatePage from './pages/Main/Book/Create/Create.jsx';
import BookEditPage from './pages/Main/Book/Edit/Edit.jsx';
import BookReadPage from './pages/Main/Book/Read/Read.jsx';
import SearchPage from './pages/Main/Search/Search.jsx';
import { BookProvider } from './components/core/Book/Provider/Provider.jsx';
import QUERY_KEYS from './constants/queryKeys.js';
import UsersPage from './pages/Main/Users/Users.jsx';
import { UserProvider } from './components/core/User/Provider/Provider.jsx';
import OthersProfilePage from './pages/Main/Profile/Others/Others.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider queryKey={QUERY_KEYS.USERS.OWN}>
        <BrowserRouter>
          <ScrollToTopRouter>
            <Routes>
              <Route path={ROUTES.AUTH.ROOT} element={<WelcomePage />} />
              <Route
                path={ROUTES.MAIN.ROOT}
                element={
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={ROUTES.MAIN.PROFILE} replace />} />
                <Route path={ROUTES.MAIN.PROFILE} element={<OwnProfilePage />} />
                <Route path={ROUTES.MAIN.BOOK.CREATE} element={<BookCreatePage />} />
                <Route
                  path={`${ROUTES.MAIN.BOOK.PRIVATE.ROOT}/:bookId`}
                  element={
                    <BookProvider queryKey={QUERY_KEYS.BOOKS.PRIVATE}>
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
                    <BookProvider queryKey={QUERY_KEYS.BOOKS.PUBLIC}>
                      <Outlet />
                    </BookProvider>
                  }
                >
                  <Route index element={<BookPage />} />
                </Route>
                <Route path={ROUTES.MAIN.SEARCH} element={<SearchPage />} />
                <Route path={ROUTES.MAIN.USERS} element={<UsersPage />} />
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
                    <SettingsPage />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={ROUTES.SETTINGS.PROFILE} replace />} />
                <Route path={ROUTES.SETTINGS.PROFILE} element={<SettingsProfilePage />} />
                <Route path={ROUTES.SETTINGS.PHOTO} element={<SettingsPhotoPage />} />

                {/* <Route path={ROUTES.SETTINGS.SECURITY} element={<SettingsSequrityPage />} /> */}
              </Route>
            </Routes>
          </ScrollToTopRouter>
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  </StrictMode>
);
