// ─── Utility helpers ─────────────────────────────────────────
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '—';
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000)     return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatDateShort = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export const getProgressPct = (raised, goal) => {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
};

export const daysUntil = (dateStr) => {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
};

export const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

export const statusColor = (status) => {
  const map = {
    'Active': 'badge-green',
    'Donor': 'badge-gold',
    'Moderately Active': 'badge-blue',
    'Inactive': 'badge-gray',
    'Approved': 'badge-green',
    'Completed': 'badge-gold',
    'Under Review': 'badge-blue',
    'Sent': 'badge-maroon',
    'Draft': 'badge-gray',
    'Near Goal': 'badge-orange',
    'Upcoming': 'badge-blue',
    'Planning': 'badge-maroon',
    'Follow-Up Due': 'badge-orange',
  };
  return map[status] || 'badge-gray';
};

export const categoryColor = (cat) => {
  const map = {
    Communication: 'cat-communication',
    CSR:           'cat-csr',
    Fundraising:   'cat-fundraising',
    Department:    'cat-department',
    Reunion:       'cat-reunion',
    Reporting:     'cat-reporting',
  };
  return map[cat] || 'cat-communication';
};
