import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegistrationModal } from './components/RegistrationModal';
import { RegistrationProvider } from './context/RegistrationContext';
import { PlatformPage } from './pages/PlatformPage';
import { SupportPage } from './pages/SupportPage';
import { TimelinePage } from './pages/TimelinePage';

export default function App() {
  return (
    <RegistrationProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<PlatformPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <RegistrationModal />
    </RegistrationProvider>
  );
}
