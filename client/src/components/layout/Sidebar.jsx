import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui';

const NAV_ITEMS = [
  { to: '/dashboard',   label: 'Dashboard',       icon: '📊', roles: ['Admin','Staff','Alumni','Corporate'] },
  { to: '/alumni',      label: 'Alumni CRM',       icon: '👥', roles: ['Admin','Staff'] },
  { to: '/fundraising', label: 'Fundraising',      icon: '💰', roles: ['Admin','Staff','Alumni'] },
  { to: '/csr',         label: 'CSR & Corporate',  icon: '🏢', roles: ['Admin','Staff','Corporate'] },
  { to: '/reunion',     label: 'Reunion Events',   icon: '🎓', roles: ['Admin','Staff','Alumni'] },
  { to: '/cms',         label: 'Content & News',   icon: '📰', roles: ['Admin','Staff'] },
  { to: '/calendar',    label: 'Admin Calendar',   icon: '📅', roles: ['Admin','Staff'] },
  { to: '/reports',     label: 'Reports',          icon: '📈', roles: ['Admin','Staff'] },
  { to: '/settings',    label: 'Settings',         icon: '⚙️', roles: ['Admin','Staff','Alumni','Corporate'] },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNav = NAV_ITEMS.filter(item => item.roles.includes(user?.role));

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="sidebar-overlay lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar fixed top-0 left-0 h-full w-64 z-50 flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-surface-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-serif flex-shrink-0 glow-gold"
              style={{ background: 'linear-gradient(135deg, #1c1b3b, #111027)', border: '1px solid rgba(234,189,83,0.4)' }}>
              ⚓
            </div>
            <div>
              <div className="text-sm font-bold text-[#f0ecff] leading-tight">MCC Alumni</div>
              <div className="text-xs font-serif italic" style={{ color: '#eabd53' }}>In Hoc Signo</div>
            </div>
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-widest" style={{ color: '#4a4878' }}>
            Development Office Portal
          </div>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-surface-border flex-shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'rgba(28,27,59,0.6)' }}>
            <Avatar initials={user?.avatar || '??'} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#f0ecff] truncate">{user?.name}</div>
              <div className="text-xs" style={{ color: '#8885b8' }}>
                <span className="badge-gold px-1.5 py-0 text-[10px]">{user?.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto sidebar-nav">
          <div className="text-[10px] uppercase tracking-widest px-4 py-2 mb-1" style={{ color: '#4a4878' }}>
            Main Navigation
          </div>
          {filteredNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose?.()}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-surface-border flex-shrink-0 space-y-1">
          <div className="text-[10px] text-center px-4 py-1" style={{ color: '#2e2d5c' }}>
            Madras Christian College · Est. 1837
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
