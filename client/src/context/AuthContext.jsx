import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// ── Demo accounts (always available, even without backend) ────
const DEMO_USERS = {
  'admin@mcc.edu.in':  { id: 1, name: 'Dr. V.J. Philip',   role: 'Admin',     avatar: 'VP', password: 'admin123' },
  'staff@mcc.edu.in':  { id: 2, name: 'Ms. Preethi Doss',  role: 'Staff',     avatar: 'PD', password: 'staff123' },
  'alumni@mcc.edu.in': { id: 3, name: 'Dr. Samuel Rajan',  role: 'Alumni',    avatar: 'SR', password: 'alumni123' },
  'csr@tcs.com':       { id: 4, name: 'TCS CSR Team',       role: 'Corporate', avatar: 'TC', password: 'csr123' },
};

const API = import.meta.env.VITE_API_URL || '';

// Helper: get initials from full name
const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('mcc_user');
    return stored ? JSON.parse(stored) : null;
  });

  /* ── LOGIN ────────────────────────────────────────────────── */
  const login = async (email, password) => {
    // 1. Try demo accounts first (works offline)
    const demo = DEMO_USERS[email];
    if (demo && demo.password === password) {
      const userData = { id: demo.id, name: demo.name, role: demo.role, avatar: demo.avatar, email };
      setUser(userData);
      localStorage.setItem('mcc_user', JSON.stringify(userData));
      return { success: true };
    }

    // 2. Try registered users stored locally (when backend is offline)
    const localUsers = JSON.parse(localStorage.getItem('mcc_registered_users') || '[]');
    const localUser = localUsers.find((u) => u.email === email && u.password === password);
    if (localUser) {
      const userData = {
        id: localUser.id,
        name: localUser.name,
        role: localUser.role || 'Alumni',
        avatar: getInitials(localUser.name),
        email: localUser.email,
      };
      setUser(userData);
      localStorage.setItem('mcc_user', JSON.stringify(userData));
      return { success: true };
    }

    // 3. Try the live backend API
    if (API) {
      try {
        const res = await fetch(`${API}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok && data.token) {
          const userData = { ...data.user, token: data.token };
          setUser(userData);
          localStorage.setItem('mcc_user', JSON.stringify(userData));
          localStorage.setItem('mcc_token', data.token);
          return { success: true };
        }
        return { success: false, message: data.error || 'Invalid credentials' };
      } catch {
        // Backend unreachable — fall through
      }
    }

    return { success: false, message: 'Invalid credentials. Use the demo accounts below.' };
  };

  /* ── REGISTER ─────────────────────────────────────────────── */
  const register = async (formData) => {
    const { name, email, password, batch, department, programme, phone, company, jobTitle, city, linkedin } = formData;

    // 1. Try live backend API
    if (API) {
      try {
        const res = await fetch(`${API}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, batch, department, programme, phone, company, jobTitle, city, linkedin }),
        });
        const data = await res.json();
        if (res.ok) return { success: true };
        if (res.status === 409) return { success: false, message: 'This email is already registered.', field: 'email' };
        return { success: false, message: data.error || 'Registration failed.' };
      } catch {
        // Backend unreachable — save locally
      }
    }

    // 2. Fallback: save to localStorage
    const existing = JSON.parse(localStorage.getItem('mcc_registered_users') || '[]');
    if (existing.find((u) => u.email === email)) {
      return { success: false, message: 'This email is already registered.', field: 'email' };
    }

    const newUser = {
      id: Date.now(),
      name, email, password,
      role: 'Alumni',
      batch, department, programme,
      phone, company, jobTitle, city, linkedin,
      registeredAt: new Date().toISOString(),
      status: 'Pending Verification',
    };
    localStorage.setItem('mcc_registered_users', JSON.stringify([...existing, newUser]));
    return { success: true };
  };

  /* ── LOGOUT ───────────────────────────────────────────────── */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('mcc_user');
    localStorage.removeItem('mcc_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
