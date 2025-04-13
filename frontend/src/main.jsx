import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import WelcomePage from './pages/Welcome/Welcome.jsx';
import MainPage from './pages/Main/Main.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import ProfilePage from './pages/Main/Profile/Profile.jsx';
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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
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
                <Route path={ROUTES.MAIN.PROFILE} element={<ProfilePage />} />
                <Route path={`${ROUTES.MAIN.BOOK.ROOT}/:context/:bookId`} element={<BookPage />} />
                <Route path={ROUTES.MAIN.BOOK.ADD} element={<BookCreatePage />} />
                <Route path={`${ROUTES.MAIN.BOOK.EDIT}/:bookId`} element={<BookEditPage />} />
                <Route path={`${ROUTES.MAIN.BOOK.READ}/:bookId`} element={<BookReadPage />} />
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
