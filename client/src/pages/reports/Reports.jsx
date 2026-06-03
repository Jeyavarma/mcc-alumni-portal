import { useState } from 'react';
import { Button, SectionHeader } from '../../components/ui';
import { formatCurrency } from '../../utils/helpers';

const REPORTS = [
  {
    id: 1,
    title: 'Alumni Engagement Report',
    description: 'Comprehensive report on alumni engagement status, communication history, and follow-up tracking across all batches.',
    icon: '👥',
    category: 'Alumni',
    size: '2.3 MB',
    lastGen: 'Today, 9:00 AM',
    stats: [{ label: 'Total Alumni', value: '12,847' }, { label: 'Active', value: '4,312' }, { label: 'Follow-ups', value: '8 pending' }],
  },
  {
    id: 2,
    title: 'Donation & Fundraising Report',
    description: 'Detailed breakdown of all donations, campaign-wise progress, donor acknowledgement status, and endowment corpus.',
    icon: '💰',
    category: 'Fundraising',
    size: '1.8 MB',
    lastGen: 'Yesterday, 4:30 PM',
    stats: [{ label: 'Total Raised', value: '₹2.87 Cr' }, { label: 'Active Campaigns', value: '4' }, { label: 'Donors', value: '490' }],
  },
  {
    id: 3,
    title: 'CSR Proposals Report',
    description: 'Status of all CSR proposals, company-wise breakdown, approved grant amounts, and follow-up activity log.',
    icon: '🏢',
    category: 'CSR',
    size: '1.2 MB',
    lastGen: '2024-04-20',
    stats: [{ label: 'Total Proposals', value: '6' }, { label: 'Approved', value: '2' }, { label: 'Grant Value', value: '₹45L' }],
  },
  {
    id: 4,
    title: 'Reunion Events Report',
    description: 'RSVP response rates, attendance projections, batch-wise participation, and reunion planning status.',
    icon: '🎓',
    category: 'Reunion',
    size: '0.9 MB',
    lastGen: '2024-04-18',
    stats: [{ label: 'Upcoming Events', value: '3' }, { label: 'RSVPs', value: '461' }, { label: 'Response Rate', value: '78%' }],
  },
  {
    id: 5,
    title: 'Department Development Report',
    description: 'Per-department fundraising progress, CSR investments, faculty research output, and infrastructure development.',
    icon: '🏛️',
    category: 'Department',
    size: '3.1 MB',
    lastGen: '2024-04-01',
    stats: [{ label: 'Departments', value: '14' }, { label: 'Funded Projects', value: '6' }, { label: 'Total Investment', value: '₹1.2 Cr' }],
  },
  {
    id: 6,
    title: 'Annual Summary Report 2023-24',
    description: 'Comprehensive annual report covering all alumni relations, fundraising, CSR partnerships, and institutional developments.',
    icon: '📋',
    category: 'Annual',
    size: '8.7 MB',
    lastGen: '2024-04-15',
    stats: [{ label: 'Fiscal Year', value: '2023-24' }, { label: 'Pages', value: '48' }, { label: 'Format', value: 'PDF' }],
  },
];

const CATEGORY_COLORS = {
  Alumni: 'badge-maroon',
  Fundraising: 'badge-gold',
  CSR: 'badge-blue',
  Reunion: 'badge-green',
  Department: 'badge-orange',
  Annual: 'badge-gray',
};

export default function Reports() {
  const [generating, setGenerating] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleGenerate = (id) => {
    setGenerating(id);
    setTimeout(() => {
      setGenerating(null);
      alert('✅ Report generated! In production, the PDF would download automatically.');
    }, 2000);
  };

  const categories = ['All', ...Array.from(new Set(REPORTS.map(r => r.category)))];
  const filtered = filter === 'All' ? REPORTS : REPORTS.filter(r => r.category === filter);

  return (
    <div className="space-y-6 page-enter">
      <SectionHeader
        title="Reports & Analytics"
        subtitle="Generate, download & schedule institutional reports"
        actions={<Button variant="gold">📅 Schedule Auto-Report</Button>}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Reports Generated', value: '127', icon: '📊', sub: 'This year' },
          { label: 'Last Generated', value: 'Today', icon: '🕐', sub: '9:00 AM' },
          { label: 'Scheduled Reports', value: '4', icon: '📅', sub: 'Monthly & quarterly' },
          { label: 'Storage Used', value: '24.6 MB', icon: '💾', sub: 'Of 1 GB' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-xl font-bold text-[#f5ede0]">{s.value}</div>
            <div className="text-xs" style={{ color: '#9e8a7a' }}>{s.label}</div>
            <div className="text-[10px] mt-0.5" style={{ color: '#6b5a5f' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filter === cat
                ? 'text-[#f5ede0] shadow-lg'
                : 'text-[#9e8a7a] hover:text-[#f5ede0]'
            }`}
            style={filter === cat ? { background: 'linear-gradient(135deg, #7b1c2e, #a52840)' } : { border: '1px solid #3d2228' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(report => (
          <div key={report.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl p-2.5 rounded-xl" style={{ background: 'rgba(123,28,46,0.15)', border: '1px solid rgba(123,28,46,0.3)' }}>
                {report.icon}
              </div>
              <span className={CATEGORY_COLORS[report.category] || 'badge-gray'}>{report.category}</span>
            </div>

            <h3 className="text-base font-semibold text-[#f5ede0] mb-2">{report.title}</h3>
            <p className="text-xs mb-4 line-clamp-2" style={{ color: '#9e8a7a' }}>{report.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {report.stats.map(s => (
                <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: '#160d0f', border: '1px solid #3d2228' }}>
                  <div className="text-sm font-bold text-[#f5ede0]">{s.value}</div>
                  <div className="text-[9px] mt-0.5" style={{ color: '#6b5a5f' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="flex items-center justify-between">
              <div className="text-xs" style={{ color: '#6b5a5f' }}>
                <div>Last: {report.lastGen}</div>
                <div>Size: {report.size}</div>
              </div>
              <button
                onClick={() => handleGenerate(report.id)}
                disabled={generating === report.id}
                className="btn-primary px-3 py-1.5 text-xs"
              >
                {generating === report.id ? (
                  <><span className="animate-spin inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full" /> Generating…</>
                ) : '⬇ Generate PDF'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports History */}
      <div className="card">
        <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Recent Download History</h3>
        <div className="space-y-2">
          {[
            { name: 'Alumni Engagement Report — Q1 2024', size: '2.3 MB', date: 'Today, 9:00 AM', user: 'Dr. V.J. Philip' },
            { name: 'Donation Report — April 2024', size: '1.1 MB', date: 'Yesterday, 4:30 PM', user: 'Ms. Preethi Doss' },
            { name: 'CSR Proposals Summary', size: '0.8 MB', date: '2024-04-20', user: 'Mr. Vincent' },
            { name: 'Annual Report 2023-24', size: '8.7 MB', date: '2024-04-15', user: 'Dr. V.J. Philip' },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ border: '1px solid rgba(61,34,40,0.5)' }}>
              <span className="text-xl">📄</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[#f5ede0] truncate">{r.name}</div>
                <div className="text-xs" style={{ color: '#6b5a5f' }}>{r.size} · {r.user} · {r.date}</div>
              </div>
              <button className="btn-ghost px-2 py-1 text-xs">⬇ Re-download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
