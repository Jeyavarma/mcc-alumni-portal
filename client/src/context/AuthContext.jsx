import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = {
  'admin@mcc.edu.in':   { id: 1, name: 'Dr. V.J. Philip', role: 'Admin',    avatar: 'VP', password: 'admin123' },
  'staff@mcc.edu.in':   { id: 2, name: 'Ms. Preethi Doss',   role: 'Staff',    avatar: 'PD', password: 'staff123' },
  'alumni@mcc.edu.in':  { id: 3, name: 'Dr. Samuel Rajan',   role: 'Alumni',   avatar: 'SR', password: 'alumni123' },
  'csr@tcs.com':        { id: 4, name: 'TCS CSR Team',        role: 'Corporate',avatar: 'TC', password: 'csr123' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('mcc_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    const found = DEMO_USERS[email];
    if (found && found.password === password) {
      const userData = { id: found.id, name: found.name, role: found.role, avatar: found.avatar, email };
      setUser(userData);
      localStorage.setItem('mcc_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Use demo accounts below.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mcc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
