import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { StatCard, Card } from '../../components/ui';
import { DASHBOARD_STATS, DONATION_TREND, ENGAGEMENT_BY_DEPT, CSR_STATUS_DIST, NEWS_ARTICLES, COMMUNICATIONS } from '../../data/sampleData';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg p-3 text-xs" style={{ border: '1px solid #3d2228' }}>
      <p className="font-semibold text-[#f5ede0] mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.name === 'donations' ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 page-enter">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5ede0]">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: '#9e8a7a' }}>
            Here's what's happening at MCC Alumni &amp; Development Office today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: 'rgba(200,150,26,0.1)', border: '1px solid rgba(200,150,26,0.25)' }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-xs font-medium" style={{ color: '#f0b429' }}>Portal Live</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Total Alumni" value={DASHBOARD_STATS.totalAlumni.toLocaleString('en-IN')} sub={`${DASHBOARD_STATS.activeAlumni.toLocaleString()} active`} trend={8} color="maroon" />
        <StatCard icon="💰" label="Total Donations" value={formatCurrency(DASHBOARD_STATS.totalDonations)} sub={`${formatCurrency(DASHBOARD_STATS.thisYearDonations)} this year`} trend={12} color="gold" />
        <StatCard icon="🏢" label="CSR Proposals" value={DASHBOARD_STATS.csrProposals} sub="2 approved, 1 under review" trend={5} color="blue" />
        <StatCard icon="🎓" label="Upcoming Reunions" value={DASHBOARD_STATS.upcomingReunions} sub="Next: Silver Jubilee, Dec" color="green" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📣" label="Active Campaigns" value={DASHBOARD_STATS.activeCampaigns} sub="1 near goal" color="gold" />
        <StatCard icon="⚠️" label="Pending Follow-ups" value={DASHBOARD_STATS.pendingFollowUps} sub="3 overdue" color="maroon" />
        <StatCard icon="📧" label="Emails This Month" value="342" sub="Open rate: 68%" trend={15} color="blue" />
        <StatCard icon="🤝" label="New Alumni (YTD)" value="184" sub="Registered 2024" trend={22} color="green" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation Trend */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#f5ede0]">Donation Trend 2024</h3>
              <p className="text-xs" style={{ color: '#9e8a7a' }}>Monthly donation volume &amp; donor count</p>
            </div>
            <span className="badge-gold">₹{(DASHBOARD_STATS.totalDonations / 10000000).toFixed(1)}Cr Total</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={DONATION_TREND} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="donGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7b1c2e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7b1c2e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="donorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c8961a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c8961a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#3d2228" />
              <XAxis dataKey="month" tick={{ fill: '#9e8a7a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} tick={{ fill: '#9e8a7a', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="donations" stroke="#a52840" strokeWidth={2} fill="url(#donGrad)" name="donations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* CSR Status */}
        <div className="card">
          <h3 className="text-base font-semibold text-[#f5ede0] mb-1">CSR Proposal Status</h3>
          <p className="text-xs mb-4" style={{ color: '#9e8a7a' }}>Distribution of {CSR_STATUS_DIST.reduce((a,b) => a+b.value,0)} proposals</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CSR_STATUS_DIST} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                {CSR_STATUS_DIST.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {CSR_STATUS_DIST.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span style={{ color: '#9e8a7a' }}>{item.name}</span>
                </div>
                <span className="font-medium text-[#f5ede0]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alumni Engagement by Dept */}
        <div className="card">
          <h3 className="text-base font-semibold text-[#f5ede0] mb-1">Alumni Engagement by Department</h3>
          <p className="text-xs mb-4" style={{ color: '#9e8a7a' }}>Active vs. inactive breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ENGAGEMENT_BY_DEPT} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3d2228" />
              <XAxis dataKey="dept" tick={{ fill: '#9e8a7a', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9e8a7a', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="active" fill="#7b1c2e" radius={[4,4,0,0]} name="Active" />
              <Bar dataKey="inactive" fill="#3d2228" radius={[4,4,0,0]} name="Inactive" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Recent Communications</h3>
          <div className="space-y-3">
            {COMMUNICATIONS.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                style={{ background: 'rgba(123,28,46,0.08)', border: '1px solid rgba(61,34,40,0.5)' }}>
                <div className="text-lg flex-shrink-0">
                  {c.type === 'Call' ? '📞' : c.type === 'Email' ? '📧' : c.type === 'Meeting' ? '🤝' : '💬'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#f5ede0] truncate">{c.alumniName}</span>
                    <span className={`flex-shrink-0 ${c.status === 'Follow-Up Due' ? 'badge-orange' : 'badge-green'}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#9e8a7a' }}>{c.subject}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#6b5a5f' }}>{formatDate(c.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Latest News & Updates</h3>
          <div className="space-y-3">
            {NEWS_ARTICLES.map(article => (
              <div key={article.id} className="flex gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-surface-elevated">
                <div className="text-2xl flex-shrink-0">{article.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-[#f5ede0] leading-snug">{article.title}</h4>
                    <span className="flex-shrink-0 badge-gold text-[10px]">{article.category}</span>
                  </div>
                  <p className="text-xs mt-1 line-clamp-1" style={{ color: '#9e8a7a' }}>{article.excerpt}</p>
                  <p className="text-[10px] mt-1" style={{ color: '#6b5a5f' }}>{formatDate(article.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-base font-semibold text-[#f5ede0] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { icon: '👤', label: 'Add New Alumni', color: 'maroon', to: '/alumni' },
              { icon: '💰', label: 'Create Campaign', color: 'gold', to: '/fundraising' },
              { icon: '📝', label: 'New CSR Proposal', color: 'blue', to: '/csr' },
              { icon: '🎓', label: 'Plan Reunion Event', color: 'green', to: '/reunion' },
              { icon: '📰', label: 'Publish News Article', color: 'maroon', to: '/cms' },
              { icon: '📊', label: 'Generate Report', color: 'gold', to: '/reports' },
            ].map(action => (
              <a key={action.label} href={`#${action.to}`}
                className="flex items-center gap-3 p-2.5 rounded-lg transition-all cursor-pointer"
                style={{ border: '1px solid rgba(61,34,40,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(123,28,46,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span className="text-lg">{action.icon}</span>
                <span className="text-sm text-[#f5ede0]">{action.label}</span>
                <span className="ml-auto text-[#6b5a5f]">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
