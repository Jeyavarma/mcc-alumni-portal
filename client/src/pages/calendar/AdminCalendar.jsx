import { useState } from 'react';
import { CALENDAR_EVENTS } from '../../data/sampleData';
import { formatDate, formatDateShort, categoryColor } from '../../utils/helpers';
import { Button, SectionHeader, Modal, Input, Select } from '../../components/ui';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const CATEGORY_OPTIONS = ['Communication', 'CSR', 'Fundraising', 'Department', 'Reunion', 'Reporting'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function AdminCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const eventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return CALENDAR_EVENTS.filter(e => e.date.startsWith(dateStr.slice(0, 7)));
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <div className="space-y-6 page-enter">
      <SectionHeader
        title="Administrative Calendar"
        subtitle="Yearly planner for alumni communications, CSR, fundraising & reunions"
        actions={
          <Button variant="primary" onClick={() => setAddOpen(true)}>+ Add Event</Button>
        }
      />

      {/* Legend */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-xs font-semibold" style={{ color: '#9e8a7a' }}>Categories:</span>
          {CATEGORY_OPTIONS.map(cat => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColor(cat)}`}>{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="card p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #3d2228' }}>
          <button onClick={prevMonth} className="btn-ghost px-3 py-1">‹</button>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-[#f5ede0]">{MONTHS[month]}</h3>
            <span className="text-lg font-bold" style={{ color: '#c8961a' }}>{year}</span>
          </div>
          <button onClick={nextMonth} className="btn-ghost px-3 py-1">›</button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7" style={{ background: '#160d0f', borderBottom: '1px solid #3d2228' }}>
          {DAYS.map(d => (
            <div key={d} className="text-center py-2 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b5a5f' }}>{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="cal-day opacity-30" style={{ borderRight: '1px solid #3d2228', borderBottom: '1px solid #3d2228' }} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const dayEvents = CALENDAR_EVENTS.filter(e => {
              const d = new Date(e.date);
              return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
            });

            return (
              <div
                key={day}
                className={`cal-day p-1.5 cursor-pointer ${isToday ? 'today' : ''}`}
                style={{ borderRight: '1px solid #3d2228', borderBottom: '1px solid #3d2228', minHeight: '90px' }}
                onClick={() => dayEvents.length > 0 && setSelected({ day, events: dayEvents })}
              >
                <div className={`text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                  isToday ? 'text-[#160d0f]' : 'text-[#9e8a7a]'
                }`} style={isToday ? { background: '#c8961a' } : {}}>
                  {day}
                </div>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 2).map(ev => (
                    <div key={ev.id} className={`text-[9px] px-1.5 py-0.5 rounded truncate border ${categoryColor(ev.category)}`}>
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[9px] px-1.5" style={{ color: '#6b5a5f' }}>+{dayEvents.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming events list */}
      <div className="card">
        <h3 className="text-base font-semibold text-[#f5ede0] mb-4">All Scheduled Events ({CALENDAR_EVENTS.length})</h3>
        <div className="space-y-2">
          {CALENDAR_EVENTS.sort((a,b) => new Date(a.date) - new Date(b.date)).map(ev => (
            <div key={ev.id} className="flex items-center gap-4 p-3 rounded-lg transition-colors" style={{ border: '1px solid rgba(61,34,40,0.5)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(123,28,46,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div className="text-center flex-shrink-0" style={{ minWidth: '48px' }}>
                <div className="text-xs font-bold" style={{ color: '#c8961a' }}>{new Date(ev.date).toLocaleDateString('en-IN', { month: 'short' })}</div>
                <div className="text-xl font-bold text-[#f5ede0]">{new Date(ev.date).getDate()}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#f5ede0]">{ev.title}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${categoryColor(ev.category)}`}>
                {ev.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Day Events Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Events — ${MONTHS[month]} ${selected?.day}`} size="sm">
        {selected && (
          <div className="space-y-3">
            {selected.events.map(ev => (
              <div key={ev.id} className="p-3 rounded-lg" style={{ background: '#160d0f', border: '1px solid #3d2228' }}>
                <div className="text-sm font-medium text-[#f5ede0] mb-1">{ev.title}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColor(ev.category)}`}>{ev.category}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Add Event Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Calendar Event" size="sm">
        <div className="space-y-4">
          <Input label="Event Title" placeholder="Monthly Alumni Newsletter" />
          <Input label="Date" type="date" />
          <Select label="Category" options={CATEGORY_OPTIONS} />
          <div>
            <label className="input-label">Description</label>
            <textarea className="input" rows={3} placeholder="Optional details…" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setAddOpen(false)}>Add Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
