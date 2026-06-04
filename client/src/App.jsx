import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Login              from './pages/auth/Login';
import Register           from './pages/auth/Register';
import Dashboard          from './pages/dashboard/Dashboard';
import AlumniCRM          from './pages/alumni/AlumniCRM';
import Fundraising        from './pages/fundraising/Fundraising';
import CSRModule          from './pages/csr/CSRModule';
import ReunionManagement  from './pages/reunion/ReunionManagement';
import CMS                from './pages/cms/CMS';
import AdminCalendar      from './pages/calendar/AdminCalendar';
import Reports            from './pages/reports/Reports';
import Settings           from './pages/settings/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1c1b3b',
              color: '#f0ecff',
              border: '1px solid #2e2d5c',
              borderRadius: '12px',
            },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected — inside AppLayout */}
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"   element={<Dashboard />} />
            <Route path="/alumni"      element={<AlumniCRM />} />
            <Route path="/fundraising" element={<Fundraising />} />
            <Route path="/csr"         element={<CSRModule />} />
            <Route path="/reunion"     element={<ReunionManagement />} />
            <Route path="/cms"         element={<CMS />} />
            <Route path="/calendar"    element={<AdminCalendar />} />
            <Route path="/reports"     element={<Reports />} />
            <Route path="/settings"    element={<Settings />} />
            <Route path="*"            element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
