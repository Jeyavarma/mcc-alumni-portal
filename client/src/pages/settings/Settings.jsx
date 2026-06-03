import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, SectionHeader, Input, Avatar } from '../../components/ui';

export default function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 page-enter max-w-4xl">
      <SectionHeader title="Settings" subtitle="Manage your profile, preferences, and notifications" />

      {/* Tab nav */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#160d0f', border: '1px solid #3d2228' }}>
        {[
          { id: 'profile', label: '👤 Profile' },
          { id: 'notifications', label: '🔔 Notifications' },
          { id: 'security', label: '🔒 Security' },
          { id: 'portal', label: '⚙️ Portal Settings' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === t.id ? 'text-[#f5ede0]' : 'text-[#9e8a7a] hover:text-[#f5ede0]'
            }`}
            style={tab === t.id ? { background: 'linear-gradient(135deg, #7b1c2e, #a52840)' } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === 'profile' && (
        <div className="space-y-5">
          <div className="card">
            <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Profile Information</h3>

            {/* Avatar section */}
            <div className="flex items-center gap-5 mb-6 p-4 rounded-xl" style={{ background: 'rgba(123,28,46,0.1)', border: '1px solid rgba(123,28,46,0.25)' }}>
              <Avatar initials={user?.avatar || '??'} size="lg" />
              <div>
                <div className="text-base font-semibold text-[#f5ede0]">{user?.name}</div>
                <div className="text-sm mb-2" style={{ color: '#9e8a7a' }}>{user?.email} · {user?.role}</div>
                <button className="btn-ghost px-3 py-1 text-xs">📷 Change Avatar</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={user?.name} />
              <Input label="Email Address" type="email" defaultValue={user?.email} />
              <Input label="Phone Number" placeholder="+91 98000 00000" />
              <Input label="Designation" placeholder="Alumni Relations Officer" />
              <Input label="Department" placeholder="Alumni & Development Office" />
              <Input label="Location" placeholder="Chennai, Tamil Nadu" />
            </div>

            <div className="mt-4">
              <label className="input-label">Bio / About</label>
              <textarea className="input" rows={3} placeholder="A brief description about yourself…" />
            </div>
          </div>

          {user?.role === 'Alumni' && (
            <div className="card">
              <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Alumni Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Batch Year" placeholder="2001" />
                <Input label="Department" placeholder="Physics" />
                <Input label="Current Company" placeholder="ISRO" />
                <Input label="Job Title" placeholder="Senior Scientist" />
                <Input label="LinkedIn Profile" placeholder="https://linkedin.com/in/…" />
                <Input label="City / Country" placeholder="Bengaluru, India" />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="ghost">Discard Changes</Button>
            <Button variant="primary" onClick={handleSave}>
              {saved ? '✅ Saved!' : '💾 Save Changes'}
            </Button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === 'notifications' && (
        <div className="card space-y-4">
          <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Notification Preferences</h3>
          {[
            { label: 'Email Notifications', desc: 'Receive updates via email', on: true },
            { label: 'Alumni Follow-up Reminders', desc: 'Alerts for pending follow-ups', on: true },
            { label: 'CSR Proposal Updates', desc: 'Status changes & approvals', on: true },
            { label: 'Fundraising Milestones', desc: 'When a campaign hits key thresholds', on: false },
            { label: 'Reunion Reminders', desc: 'Event reminders and RSVP alerts', on: true },
            { label: 'Weekly Summary Digest', desc: 'Every Monday morning digest', on: false },
          ].map(n => (
            <div key={n.label} className="flex items-center justify-between p-3 rounded-lg" style={{ border: '1px solid #3d2228' }}>
              <div>
                <div className="text-sm font-medium text-[#f5ede0]">{n.label}</div>
                <div className="text-xs" style={{ color: '#9e8a7a' }}>{n.desc}</div>
              </div>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${n.on ? 'bg-maroon-700' : 'bg-surface-border'}`}
                style={{ background: n.on ? '#7b1c2e' : '#3d2228' }}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${n.on ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security */}
      {tab === 'security' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Change Password</h3>
            <div className="space-y-3 max-w-sm">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••" />
              <Input label="Confirm New Password" type="password" placeholder="••••••••" />
              <Button variant="primary">Update Password</Button>
            </div>
          </div>
          <div className="card">
            <h3 className="text-base font-semibold text-[#f5ede0] mb-2">Active Sessions</h3>
            <div className="space-y-2">
              {[
                { device: 'Chrome on Windows', location: 'Chennai, TN', time: 'Current session', current: true },
                { device: 'Mobile — Android', location: 'Chennai, TN', time: '2 hours ago', current: false },
              ].map(s => (
                <div key={s.device} className="flex items-center justify-between p-3 rounded-lg" style={{ border: '1px solid #3d2228' }}>
                  <div>
                    <div className="text-sm text-[#f5ede0] flex items-center gap-2">
                      {s.device}
                      {s.current && <span className="badge-green text-[9px]">Current</span>}
                    </div>
                    <div className="text-xs" style={{ color: '#9e8a7a' }}>{s.location} · {s.time}</div>
                  </div>
                  {!s.current && <Button variant="danger" size="sm">Revoke</Button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Portal Settings (Admin only) */}
      {tab === 'portal' && (
        <div className="card">
          <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Portal Configuration</h3>
          {user?.role === 'Admin' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Institution Name" defaultValue="Madras Christian College" />
              <Input label="Portal Title" defaultValue="Alumni & Development Office Portal" />
              <Input label="Contact Email" defaultValue="alumni@mcc.edu.in" />
              <Input label="Contact Phone" defaultValue="+91-44-2367-4641" />
              <div className="sm:col-span-2 flex justify-end">
                <Button variant="primary" onClick={handleSave}>{saved ? '✅ Saved!' : '💾 Save Configuration'}</Button>
              </div>
            </div>
          ) : (
            <div className="text-sm" style={{ color: '#9e8a7a' }}>
              Portal configuration is only accessible to Administrators.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
