import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import WelcomePage from './pages/Welcome/WelcomePage.jsx';
import MainPage from './pages/Main/MainPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import ProfilePage from './pages/Main/Profile/ProfilePage.jsx';
import SetPhotoZone from './pages/Settings/SetPhoto/SetPhotoPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<WelcomePage />} />
        <Route path="/" element={<MainPage />}>
          <Route path="" element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="search" element={<SetPhotoZone />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
