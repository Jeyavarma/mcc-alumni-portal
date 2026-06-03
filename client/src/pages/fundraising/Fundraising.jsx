import { useState } from 'react';
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CAMPAIGNS } from '../../data/sampleData';
import { formatCurrency, formatDate, getProgressPct, daysUntil, statusColor } from '../../utils/helpers';
import { Badge, Button, SectionHeader, ProgressBar, Modal, Input, Select } from '../../components/ui';

export default function Fundraising() {
  const [selected, setSelected] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [tab, setTab] = useState('campaigns');

  const totalGoal  = CAMPAIGNS.reduce((s, c) => s + c.goal, 0);
  const totalRaised= CAMPAIGNS.reduce((s, c) => s + c.raised, 0);
  const overallPct = getProgressPct(totalRaised, totalGoal);

  return (
    <div className="space-y-6 page-enter">
      <SectionHeader
        title="Fundraising & Endowment"
        subtitle="Crowdfunding campaigns, donations & endowment corpus"
        actions={
          <>
            <Button variant="ghost">📊 Dept Report</Button>
            <Button variant="primary" onClick={() => setNewOpen(true)}>+ New Campaign</Button>
          </>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-xs mb-2" style={{ color: '#9e8a7a' }}>Overall Fundraising Progress</div>
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-2xl font-bold" style={{ color: '#c8961a' }}>{formatCurrency(totalRaised)}</div>
              <div className="text-xs" style={{ color: '#9e8a7a' }}>of {formatCurrency(totalGoal)} goal</div>
            </div>
            <div className="text-3xl font-bold text-gradient-gold">{overallPct}%</div>
          </div>
          <ProgressBar value={totalRaised} max={totalGoal} showLabel={false} />
        </div>
        <div className="card p-5">
          <div className="text-xs mb-2" style={{ color: '#9e8a7a' }}>Total Donors (All-time)</div>
          <div className="text-3xl font-bold text-[#f5ede0]">490</div>
          <div className="text-xs mt-1" style={{ color: '#2d9e6b' }}>↑ 23 new this month</div>
        </div>
        <div className="card p-5">
          <div className="text-xs mb-2" style={{ color: '#9e8a7a' }}>Endowment Corpus</div>
          <div className="text-3xl font-bold text-gradient-gold">₹1.2 Cr</div>
          <div className="text-xs mt-1" style={{ color: '#9e8a7a' }}>Target: ₹5 Cr by 2030</div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {CAMPAIGNS.map(c => {
          const pct = getProgressPct(c.raised, c.goal);
          const days = daysUntil(c.deadline);
          return (
            <div key={c.id} className="card cursor-pointer group" onClick={() => setSelected(c)}>
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{c.image}</div>
                <Badge status={c.status}>{c.status}</Badge>
              </div>
              <h3 className="text-base font-semibold text-[#f5ede0] mb-1 group-hover:text-gradient leading-snug">{c.title}</h3>
              <p className="text-xs mb-3 line-clamp-2" style={{ color: '#9e8a7a' }}>{c.description}</p>

              <ProgressBar value={c.raised} max={c.goal} className="mb-3" />

              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold" style={{ color: '#c8961a' }}>{formatCurrency(c.raised)}</span>
                  <span style={{ color: '#6b5a5f' }}> / {formatCurrency(c.goal)}</span>
                </div>
                <span style={{ color: '#9e8a7a' }}>{c.donors} donors</span>
              </div>

              <div className="divider" />

              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#9e8a7a' }}>Dept: {c.dept}</span>
                {c.status !== 'Completed' && (
                  <span style={{ color: days < 60 ? '#e07b1a' : '#9e8a7a' }}>
                    {days > 0 ? `${days}d left` : 'Ended'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge status={selected.status}>{selected.status}</Badge>
              <div className="text-sm" style={{ color: '#9e8a7a' }}>Deadline: {formatDate(selected.deadline)}</div>
            </div>
            <p className="text-sm" style={{ color: '#9e8a7a' }}>{selected.description}</p>

            <div className="p-4 rounded-xl" style={{ background: 'rgba(200,150,26,0.08)', border: '1px solid rgba(200,150,26,0.2)' }}>
              <div className="flex justify-between mb-2">
                <div>
                  <div className="text-2xl font-bold" style={{ color: '#c8961a' }}>{formatCurrency(selected.raised)}</div>
                  <div className="text-xs" style={{ color: '#9e8a7a' }}>raised of {formatCurrency(selected.goal)}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#f5ede0]">{selected.donors}</div>
                  <div className="text-xs" style={{ color: '#9e8a7a' }}>donors</div>
                </div>
              </div>
              <ProgressBar value={selected.raised} max={selected.goal} showLabel={false} />
            </div>

            {/* Donors list placeholder */}
            <div>
              <h4 className="text-sm font-semibold text-[#f5ede0] mb-3">Recent Donors</h4>
              <div className="space-y-2">
                {[
                  { name: 'Mr. Benjamin Matthew', amount: 100000, date: '2024-04-15' },
                  { name: 'Mr. Isaac Thomas', amount: 250000, date: '2024-04-10' },
                  { name: 'Dr. Vasantha Kumari', amount: 50000, date: '2024-04-08' },
                  { name: 'Ms. Leela Subramaniam', amount: 25000, date: '2024-04-05' },
                ].map(d => (
                  <div key={d.name} className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: '#160d0f', border: '1px solid #3d2228' }}>
                    <div className="text-sm text-[#f5ede0]">{d.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium" style={{ color: '#c8961a' }}>{formatCurrency(d.amount)}</span>
                      <span className="text-xs" style={{ color: '#6b5a5f' }}>{formatDate(d.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="gold">💰 Record Donation</Button>
              <Button variant="ghost">📧 Thank Donors</Button>
              <Button variant="ghost">📊 Export Report</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Campaign Modal */}
      <Modal open={newOpen} onClose={() => setNewOpen(false)} title="Create New Campaign" size="md">
        <div className="space-y-4">
          <Input label="Campaign Title" placeholder="Physics Lab Modernisation Fund" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Department" options={['General', 'Physics', 'Chemistry', 'Computer Science', 'English', 'Commerce']} />
            <Input label="Fundraising Goal (₹)" type="number" placeholder="2500000" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="date" />
            <Input label="Deadline" type="date" />
          </div>
          <div>
            <label className="input-label">Description</label>
            <textarea className="input" rows={3} placeholder="Describe the campaign purpose and impact…" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setNewOpen(false)}>Launch Campaign</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
