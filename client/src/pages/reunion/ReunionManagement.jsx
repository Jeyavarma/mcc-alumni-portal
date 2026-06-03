import { useState } from 'react';
import { REUNION_EVENTS } from '../../data/sampleData';
import { formatDate, daysUntil } from '../../utils/helpers';
import { Badge, Button, SectionHeader, Modal, Input, ProgressBar } from '../../components/ui';

const GALLERY = [
  { id: 1, emoji: '📸', caption: 'Batch 1974 Golden Jubilee — 2024 pre-reunion gathering' },
  { id: 2, emoji: '🎉', caption: 'Silver Jubilee Batch 1999 — registration desk' },
  { id: 3, emoji: '🏛️', caption: 'Annual Alumni Meet 2023 — Principal\'s address' },
  { id: 4, emoji: '🥂', caption: 'Gala Dinner — Annual Alumni Meet 2023' },
  { id: 5, emoji: '🎭', caption: 'Cultural programme — Batch 1990' },
  { id: 6, emoji: '📜', caption: 'Distinguished Alumni Award Ceremony 2023' },
];

export default function ReunionManagement() {
  const [selected, setSelected] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [rsvpTab, setRsvpTab] = useState('upcoming');

  return (
    <div className="space-y-6 page-enter">
      <SectionHeader
        title="Reunion Management"
        subtitle="Plan events, track RSVPs & celebrate memories"
        actions={
          <>
            <Button variant="ghost">📧 Batch Invite</Button>
            <Button variant="primary" onClick={() => setNewOpen(true)}>+ Plan Event</Button>
          </>
        }
      />

      {/* Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {REUNION_EVENTS.map(ev => {
          const days = daysUntil(ev.date);
          const rsvpTotal = ev.rsvpYes + ev.rsvpNo + ev.rsvpMaybe;
          const responsePct = Math.round((rsvpTotal / ev.invitesSent) * 100);

          return (
            <div key={ev.id} className="card cursor-pointer group" onClick={() => setSelected(ev)}>
              {/* Type badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`badge-gold text-xs`}>{ev.type}</span>
                <Badge status={ev.status}>{ev.status}</Badge>
              </div>

              <h3 className="text-base font-semibold text-[#f5ede0] mb-1 leading-snug group-hover:text-gradient">
                {ev.title}
              </h3>
              <p className="text-xs mb-4 line-clamp-2" style={{ color: '#9e8a7a' }}>{ev.description}</p>

              {/* Date & Venue */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs" style={{ color: '#9e8a7a' }}>
                  <span>📅</span>
                  <span>{formatDate(ev.date)}</span>
                  {days > 0 && <span className="badge-orange ml-auto">{days}d to go</span>}
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: '#9e8a7a' }}>
                  <span>📍</span>
                  <span>{ev.venue}</span>
                </div>
              </div>

              {/* RSVP Stats */}
              <div className="p-3 rounded-lg mb-3" style={{ background: 'rgba(123,28,46,0.1)', border: '1px solid rgba(123,28,46,0.25)' }}>
                <div className="flex justify-between text-xs mb-2">
                  <span style={{ color: '#9e8a7a' }}>RSVP Response Rate</span>
                  <span style={{ color: '#f5ede0' }}>{responsePct}%</span>
                </div>
                <ProgressBar value={rsvpTotal} max={ev.invitesSent} showLabel={false} />
                <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                  <div>
                    <div className="text-base font-bold" style={{ color: '#4ade80' }}>{ev.rsvpYes}</div>
                    <div className="text-[10px]" style={{ color: '#9e8a7a' }}>Attending</div>
                  </div>
                  <div>
                    <div className="text-base font-bold" style={{ color: '#f0b429' }}>{ev.rsvpMaybe}</div>
                    <div className="text-[10px]" style={{ color: '#9e8a7a' }}>Maybe</div>
                  </div>
                  <div>
                    <div className="text-base font-bold" style={{ color: '#f0aab8' }}>{ev.rsvpNo}</div>
                    <div className="text-[10px]" style={{ color: '#9e8a7a' }}>Declined</div>
                  </div>
                </div>
              </div>

              <div className="text-xs" style={{ color: '#6b5a5f' }}>
                {ev.invitesSent} invitations sent
              </div>
            </div>
          );
        })}
      </div>

      {/* Photo Gallery */}
      <div className="card">
        <h3 className="text-base font-semibold text-[#f5ede0] mb-4">📸 Reunion Memories Gallery</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {GALLERY.map(img => (
            <div key={img.id} className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 group"
              style={{ background: 'rgba(123,28,46,0.2)', border: '1px solid rgba(123,28,46,0.3)' }}>
              <div className="text-4xl mb-2">{img.emoji}</div>
              <div className="text-[10px] text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#9e8a7a' }}>
                {img.caption}
              </div>
            </div>
          ))}
          <div className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 border-dashed"
            style={{ border: '2px dashed #3d2228' }}>
            <div className="text-2xl mb-1" style={{ color: '#6b5a5f' }}>+</div>
            <div className="text-[10px]" style={{ color: '#6b5a5f' }}>Upload Photo</div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge status={selected.status}>{selected.status}</Badge>
              <span className="badge-gold">{selected.type}</span>
              <span className="badge-blue">Batch {selected.batch}</span>
            </div>
            <p className="text-sm" style={{ color: '#9e8a7a' }}>{selected.description}</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Event Date', value: formatDate(selected.date), icon: '📅' },
                { label: 'Venue', value: selected.venue, icon: '📍' },
                { label: 'Invitations Sent', value: selected.invitesSent, icon: '📨' },
                { label: 'Days Until Event', value: daysUntil(selected.date) > 0 ? `${daysUntil(selected.date)} days` : 'Completed', icon: '⏱️' },
              ].map(f => (
                <div key={f.label} className="p-3 rounded-lg" style={{ background: '#160d0f', border: '1px solid #3d2228' }}>
                  <div className="text-xs mb-0.5" style={{ color: '#6b5a5f' }}>{f.icon} {f.label}</div>
                  <div className="text-sm font-medium text-[#f5ede0]">{f.value}</div>
                </div>
              ))}
            </div>

            {/* RSVP Breakdown */}
            <div>
              <h4 className="text-sm font-semibold text-[#f5ede0] mb-3">RSVP Breakdown</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Attending', count: selected.rsvpYes, color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
                  { label: 'Maybe', count: selected.rsvpMaybe, color: '#f0b429', bg: 'rgba(240,180,41,0.1)' },
                  { label: 'Declined', count: selected.rsvpNo, color: '#f0aab8', bg: 'rgba(240,170,184,0.1)' },
                ].map(s => (
                  <div key={s.label} className="p-4 rounded-xl text-center" style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
                    <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
                    <div className="text-xs mt-1" style={{ color: '#9e8a7a' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button variant="primary">📧 Send Reminders</Button>
              <Button variant="gold">📋 View RSVP List</Button>
              <Button variant="ghost">📊 Export Report</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Event Modal */}
      <Modal open={newOpen} onClose={() => setNewOpen(false)} title="Plan New Reunion Event" size="md">
        <div className="space-y-4">
          <Input label="Event Title" placeholder="Silver Jubilee Reunion — Batch of 2000" />
          <div className="grid grid-cols-2 gap-3">
            <select className="select"><option>Silver Jubilee</option><option>Golden Jubilee</option><option>Annual Meet</option><option>Diamond Jubilee</option></select>
            <Input label="Batch Year" placeholder="2000" />
            <Input label="Event Date" type="date" />
            <Input label="Registration Deadline" type="date" />
          </div>
          <Input label="Venue" placeholder="Bishop Heber Hall, MCC Campus" />
          <div>
            <label className="input-label">Description</label>
            <textarea className="input" rows={3} placeholder="Event description and special activities…" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setNewOpen(false)}>Create Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
