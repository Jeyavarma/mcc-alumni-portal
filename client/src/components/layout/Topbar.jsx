import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui';

const PAGE_TITLES = {
  '/dashboard':   { title: 'Dashboard', sub: 'Overview & Analytics' },
  '/alumni':      { title: 'Alumni CRM', sub: 'Manage alumni relationships' },
  '/fundraising': { title: 'Fundraising & Endowment', sub: 'Campaigns & donation tracking' },
  '/csr':         { title: 'CSR & Corporate Relations', sub: 'Proposal management & partnerships' },
  '/reunion':     { title: 'Reunion Management', sub: 'Events, RSVPs & memories' },
  '/cms':         { title: 'Content Management', sub: 'News, stories & announcements' },
  '/calendar':    { title: 'Administrative Calendar', sub: 'Yearly planner & schedules' },
  '/reports':     { title: 'Reports & Analytics', sub: 'Download & analyse data' },
  '/settings':    { title: 'Settings', sub: 'Profile & preferences' },
};

export default function Topbar({ onMenuToggle }) {
  const { user } = useAuth();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);

  const page = Object.entries(PAGE_TITLES).find(([path]) =>
    location.pathname.startsWith(path)
  );
  const { title, sub } = page?.[1] || { title: 'Portal', sub: '' };

  const notifications = [
    { id: 1, text: 'CSR Follow-up due: Cognizant Foundation', time: '2h ago', icon: '🏢' },
    { id: 2, text: 'New RSVP: Silver Jubilee — Batch 1999', time: '4h ago', icon: '🎓' },
    { id: 3, text: 'Campaign milestone: Library Fund at 64%', time: '1d ago', icon: '📚' },
    { id: 4, text: '8 alumni follow-ups pending this week', time: '1d ago', icon: '👥' },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 flex-shrink-0"
      style={{ background: 'rgba(13,12,32,0.85)', borderBottom: '1px solid #2e2d5c', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 30 }}>

      {/* Left: Menu + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-[#9e8a7a] hover:text-[#f5ede0] hover:bg-surface-elevated transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h2 className="text-base font-semibold text-[#f5ede0] leading-tight">{title}</h2>
          <p className="text-xs hidden sm:block" style={{ color: '#9e8a7a' }}>{sub}</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Date */}
        <div className="hidden md:block text-xs px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(28,27,59,0.5)', border: '1px solid rgba(46,45,92,0.8)', color: '#8885b8' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: '#9e8a7a' }}
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#c8961a' }} />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 glass rounded-xl shadow-2xl z-50 animate-fade-in"
              style={{ border: '1px solid #3d2228' }}>
              <div className="px-4 py-3 border-b border-surface-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#f0ecff]">Notifications</span>
                  <span className="badge-maroon text-xs">{notifications.length} new</span>
                </div>
              </div>
              <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="flex gap-3 p-2.5 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors">
                    <span className="text-base flex-shrink-0 mt-0.5">{n.icon}</span>
                    <div>
                      <p className="text-xs text-[#f5ede0]">{n.text}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: '#6b5a5f' }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <Avatar initials={user?.avatar || '??'} size="sm" className="cursor-pointer" />
      </div>
    </header>
  );
}
