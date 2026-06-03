import { useState } from 'react';
import { CSR_PROPOSALS, CSR_COMPANIES } from '../../data/sampleData';
import { formatCurrency, formatDate, statusColor } from '../../utils/helpers';
import { Badge, Button, SectionHeader, Modal, Input, Select, Tabs, SearchInput } from '../../components/ui';

const STATUS_COLS = ['Draft', 'Sent', 'Under Review', 'Approved', 'Completed'];

const STATUS_ICONS = {
  Draft: '📝', Sent: '📤', 'Under Review': '🔍', Approved: '✅', Completed: '🏆'
};

export default function CSRModule() {
  const [tab, setTab] = useState('kanban');
  const [selected, setSelected] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = CSR_PROPOSALS.filter(p =>
    !search || p.company.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const byStatus = (status) => filtered.filter(p => p.status === status);

  return (
    <div className="space-y-6 page-enter">
      <SectionHeader
        title="CSR & Corporate Relations"
        subtitle="Manage corporate partnerships, proposals & follow-ups"
        actions={
          <>
            <Button variant="ghost">🏢 Add Company</Button>
            <Button variant="primary" onClick={() => setNewOpen(true)}>+ New Proposal</Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {STATUS_COLS.map(s => (
          <div key={s} className="card p-3 text-center">
            <div className="text-2xl mb-1">{STATUS_ICONS[s]}</div>
            <div className="text-xl font-bold text-[#f5ede0]">{CSR_PROPOSALS.filter(p => p.status === s).length}</div>
            <div className="text-xs" style={{ color: '#9e8a7a' }}>{s}</div>
          </div>
        ))}
      </div>

      <Tabs
        tabs={[{ id: 'kanban', label: '📋 Kanban Board' }, { id: 'list', label: '📄 Proposals List' }, { id: 'companies', label: '🏢 Companies' }]}
        active={tab}
        onChange={setTab}
      />

      {/* Kanban */}
      {tab === 'kanban' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
          {STATUS_COLS.map(status => (
            <div key={status} className="kanban-col min-w-[200px]">
              <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid #3d2228' }}>
                <span>{STATUS_ICONS[status]}</span>
                <span className="text-sm font-semibold text-[#f5ede0]">{status}</span>
                <span className="ml-auto badge-gray">{CSR_PROPOSALS.filter(p => p.status === status).length}</span>
              </div>
              <div className="space-y-2">
                {CSR_PROPOSALS.filter(p => p.status === status).map(p => (
                  <div key={p.id} className="kanban-card" onClick={() => setSelected(p)}>
                    <div className="text-sm font-medium text-[#f5ede0] mb-1 leading-snug">{p.title}</div>
                    <div className="text-xs mb-2" style={{ color: '#9e8a7a' }}>{p.company}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium" style={{ color: '#c8961a' }}>{formatCurrency(p.amount)}</span>
                      <span className="text-xs badge-blue">{p.focusArea}</span>
                    </div>
                    {p.nextFollowUp && (
                      <div className="text-[10px] mt-2" style={{ color: '#e07b1a' }}>
                        📅 Follow-up: {formatDate(p.nextFollowUp)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposals List */}
      {tab === 'list' && (
        <div className="space-y-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search proposals, companies…" className="max-w-md" />
          <div className="table-container">
            <table className="w-full">
              <thead>
                <tr>
                  {['Proposal', 'Company', 'Amount', 'Focus Area', 'Status', 'Date', 'Officer', ''].map(h => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="table-row cursor-pointer" onClick={() => setSelected(p)}>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-[#f5ede0] max-w-[200px]">{p.title}</div>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#9e8a7a' }}>{p.company}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: '#c8961a' }}>{formatCurrency(p.amount)}</td>
                    <td className="px-4 py-3"><span className="badge-blue">{p.focusArea}</span></td>
                    <td className="px-4 py-3"><Badge status={p.status}>{p.status}</Badge></td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#9e8a7a' }}>{formatDate(p.date)}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#9e8a7a' }}>{p.officer}</td>
                    <td className="px-4 py-3">
                      <button className="text-[#9e8a7a] hover:text-[#f5ede0] text-sm">View →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Companies */}
      {tab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CSR_COMPANIES.map(c => (
            <div key={c.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold text-[#f5ede0]">{c.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: '#9e8a7a' }}>{c.industry} · {c.city}</p>
                </div>
                <span className="badge-blue">{c.proposals} proposals</span>
              </div>
              <div className="mb-3">
                <div className="text-xs mb-1" style={{ color: '#6b5a5f' }}>CSR Budget</div>
                <div className="text-lg font-bold" style={{ color: '#c8961a' }}>{formatCurrency(c.csrBudget)}</div>
              </div>
              <div className="mb-3">
                <div className="text-xs mb-1" style={{ color: '#6b5a5f' }}>Focus Areas</div>
                <div className="flex flex-wrap gap-1">
                  {c.focusAreas.map(f => <span key={f} className="badge-blue text-[10px]">{f}</span>)}
                </div>
              </div>
              <div className="divider" />
              <div className="flex items-center justify-between">
                <div className="text-xs" style={{ color: '#9e8a7a' }}>Contact: {c.contact}</div>
                <Button variant="ghost" size="sm">View →</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposal Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="CSR Proposal Details" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: 'rgba(123,28,46,0.15)', border: '1px solid rgba(123,28,46,0.3)' }}>
              <h3 className="text-lg font-bold text-[#f5ede0] mb-1">{selected.title}</h3>
              <p className="text-sm" style={{ color: '#9e8a7a' }}>{selected.company}</p>
              <div className="flex gap-2 mt-2">
                <Badge status={selected.status}>{selected.status}</Badge>
                <span className="badge-blue">{selected.focusArea}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Grant Amount', value: formatCurrency(selected.amount), icon: '💰' },
                { label: 'Submitted', value: formatDate(selected.date), icon: '📅' },
                { label: 'Handling Officer', value: selected.officer, icon: '👤' },
                { label: 'Next Follow-up', value: selected.nextFollowUp ? formatDate(selected.nextFollowUp) : 'N/A', icon: '🔔' },
              ].map(f => (
                <div key={f.label} className="p-3 rounded-lg" style={{ background: '#160d0f', border: '1px solid #3d2228' }}>
                  <div className="text-xs mb-0.5" style={{ color: '#6b5a5f' }}>{f.icon} {f.label}</div>
                  <div className="text-sm font-medium text-[#f5ede0]">{f.value}</div>
                </div>
              ))}
            </div>

            {/* Workflow */}
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#9e8a7a' }}>PROPOSAL WORKFLOW</div>
              <div className="flex items-center gap-1">
                {STATUS_COLS.map((s, i) => {
                  const idx = STATUS_COLS.indexOf(selected.status);
                  const isPast = i <= idx;
                  return (
                    <div key={s} className="flex items-center flex-1">
                      <div className={`flex-1 h-1 rounded-full ${isPast ? '' : ''}`}
                        style={{ background: isPast ? '#7b1c2e' : '#3d2228' }} />
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${i === idx ? 'ring-2 ring-gold-400' : ''}`}
                        style={{ background: isPast ? '#c8961a' : '#3d2228' }} />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1">
                {STATUS_COLS.map((s, i) => {
                  const idx = STATUS_COLS.indexOf(selected.status);
                  return <div key={s} className="text-[9px] text-center" style={{ color: i <= idx ? '#c8961a' : '#4a3538', flex: 1 }}>{s}</div>;
                })}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button variant="primary">📤 Advance Status</Button>
              <Button variant="ghost">📝 Add Note</Button>
              <Button variant="ghost">📅 Set Follow-up</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Proposal Modal */}
      <Modal open={newOpen} onClose={() => setNewOpen(false)} title="Create CSR Proposal" size="md">
        <div className="space-y-4">
          <Input label="Proposal Title" placeholder="AI Research Lab Setup" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Company" options={CSR_COMPANIES.map(c => c.name)} />
            <Input label="Grant Amount (₹)" type="number" placeholder="2500000" />
            <Select label="Focus Area" options={['Education', 'Technology', 'Infrastructure', 'Scholarships', 'Research']} />
            <Input label="Submission Date" type="date" />
          </div>
          <div>
            <label className="input-label">Proposal Summary</label>
            <textarea className="input" rows={3} placeholder="Brief description of the project and CSR alignment…" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setNewOpen(false)}>Create Proposal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
