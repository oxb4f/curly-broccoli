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
import SessionProvider from './components/core/SessionProvider/SessionProvider.jsx';
import SettingsPhotoPage from './pages/Settings/Photo/Photo.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <BrowserRouter>
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
              {/* <Route path="search" element={<SetPhotoZone />} /> */}
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
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  </StrictMode>
);
