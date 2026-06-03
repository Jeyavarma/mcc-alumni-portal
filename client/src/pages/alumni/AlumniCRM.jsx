import { useState } from 'react';
import { ALUMNI, DEPARTMENTS } from '../../data/sampleData';
import { formatCurrency, formatDate, statusColor } from '../../utils/helpers';
import { Badge, SearchInput, Button, SectionHeader, Avatar, Modal, Input, Select } from '../../components/ui';

export default function AlumniCRM() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [batchFilter, setBatchFilter] = useState('All');
  const [engFilter, setEngFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const batches = ['All', ...Array.from(new Set(ALUMNI.map(a => a.batch))).sort((a,b) => b-a)];
  const engagements = ['All', 'Active', 'Donor', 'Moderately Active', 'Inactive'];
  const depts = ['All', ...DEPARTMENTS];

  const filtered = ALUMNI.filter(a => {
    const q = search.toLowerCase();
    const matchQ = !q || a.name.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    const matchD = deptFilter === 'All' || a.dept === deptFilter;
    const matchB = batchFilter === 'All' || a.batch === batchFilter;
    const matchE = engFilter === 'All' || a.engagement === engFilter;
    return matchQ && matchD && matchB && matchE;
  });

  return (
    <div className="space-y-6 page-enter">
      <SectionHeader
        title="Alumni CRM"
        subtitle={`${ALUMNI.length} alumni registered · ${filtered.length} shown`}
        actions={
          <>
            <Button variant="ghost" onClick={() => {}}>⬇ Export CSV</Button>
            <Button variant="primary" onClick={() => setAddOpen(true)}>+ Add Alumni</Button>
          </>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Alumni', value: '12,847', icon: '👥', color: '#7b1c2e' },
          { label: 'Active', value: '4,312', icon: '✅', color: '#2d9e6b' },
          { label: 'Donors', value: '1,847', icon: '💛', color: '#c8961a' },
          { label: 'Follow-ups Due', value: '8', icon: '⚠️', color: '#e07b1a' },
        ].map(s => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="text-xl font-bold text-[#f5ede0]">{s.value}</div>
              <div className="text-xs" style={{ color: '#9e8a7a' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search alumni, company, city…" className="lg:col-span-2" />
          <select className="select" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            {depts.map(d => <option key={d}>{d}</option>)}
          </select>
          <div className="flex gap-2">
            <select className="select flex-1" value={batchFilter} onChange={e => setBatchFilter(e.target.value)}>
              {batches.map(b => <option key={b}>{b}</option>)}
            </select>
            <select className="select flex-1" value={engFilter} onChange={e => setEngFilter(e.target.value)}>
              {engagements.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="w-full">
          <thead>
            <tr>
              {['Alumni', 'Batch / Dept', 'Company & Role', 'Engagement', 'Donations', 'Last Contact', ''].map(h => (
                <th key={h} className="table-header">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="table-row cursor-pointer" onClick={() => setSelected(a)}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar initials={a.avatar} size="sm" />
                    <div>
                      <div className="text-sm font-medium text-[#f5ede0]">{a.name}</div>
                      <div className="text-xs" style={{ color: '#9e8a7a' }}>{a.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: '#9e8a7a' }}>
                  <div className="font-medium text-[#f5ede0]">Batch {a.batch}</div>
                  <div className="text-xs">{a.dept}</div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="font-medium text-[#f5ede0]">{a.company}</div>
                  <div className="text-xs" style={{ color: '#9e8a7a' }}>{a.role} · {a.city}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge status={a.engagement}>{a.engagement}</Badge>
                </td>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: '#c8961a' }}>
                  {formatCurrency(a.donationTotal)}
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: '#9e8a7a' }}>
                  {formatDate(a.lastContact)}
                </td>
                <td className="px-4 py-3">
                  <button className="text-[#9e8a7a] hover:text-[#f5ede0] transition-colors text-sm" onClick={e => { e.stopPropagation(); setSelected(a); }}>
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#9e8a7a]">No alumni match your filters.</div>
        )}
      </div>

      {/* Profile Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Alumni Profile" size="lg">
        {selected && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(123,28,46,0.15)', border: '1px solid rgba(123,28,46,0.3)' }}>
              <Avatar initials={selected.avatar} size="lg" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#f5ede0]">{selected.name}</h3>
                <p className="text-sm" style={{ color: '#9e8a7a' }}>{selected.role} · {selected.company}</p>
                <p className="text-sm mt-1" style={{ color: '#9e8a7a' }}>{selected.city}</p>
                <div className="flex gap-2 mt-2">
                  <Badge status={selected.engagement}>{selected.engagement}</Badge>
                  <span className="badge-maroon">Batch {selected.batch}</span>
                  <span className="badge-blue">{selected.dept}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold" style={{ color: '#c8961a' }}>{formatCurrency(selected.donationTotal)}</div>
                <div className="text-xs" style={{ color: '#9e8a7a' }}>Total Donations</div>
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Email', value: selected.email, icon: '📧' },
                { label: 'Phone', value: selected.phone, icon: '📞' },
                { label: 'Last Contact', value: formatDate(selected.lastContact), icon: '📅' },
                { label: 'Dept & Batch', value: `${selected.dept} · Batch ${selected.batch}`, icon: '🎓' },
              ].map(f => (
                <div key={f.label} className="p-3 rounded-lg" style={{ background: '#160d0f', border: '1px solid #3d2228' }}>
                  <div className="text-xs mb-0.5" style={{ color: '#6b5a5f' }}>{f.icon} {f.label}</div>
                  <div className="text-sm text-[#f5ede0]">{f.value}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <Button variant="primary">📧 Send Email</Button>
              <Button variant="gold">💰 Record Donation</Button>
              <Button variant="ghost">📞 Log Call</Button>
              <Button variant="ghost">📅 Schedule Follow-up</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Alumni Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Register New Alumni" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Full Name" placeholder="Dr. John Smith" />
            <Input label="Email" type="email" placeholder="john@email.com" />
            <Input label="Phone" placeholder="+91 98000 00000" />
            <Input label="Batch Year" placeholder="2001" />
            <Select label="Department" options={['Select...', ...DEPARTMENTS]} />
            <Input label="Current Company" placeholder="Google India" />
            <Input label="Designation / Role" placeholder="Software Engineer" />
            <Input label="City" placeholder="Chennai" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setAddOpen(false)}>Register Alumni</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
