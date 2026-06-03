// ─── Reusable UI Components ─────────────────────────────────────
import { statusColor } from '../../utils/helpers';

/* Button */
export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', type = 'button', ...props }) {
  const variants = {
    primary: 'btn-primary',
    gold:    'btn-gold',
    ghost:   'btn-ghost',
    outline: 'btn-outline',
    danger:  'btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-900/30 text-red-400 border border-red-900/50 hover:bg-red-900/50 transition-all',
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: '', lg: 'px-6 py-3 text-base' };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* Card */
export function Card({ children, className = '', hoverable = true }) {
  return (
    <div className={`card ${hoverable ? '' : 'hover:transform-none hover:shadow-none'} ${className}`}>
      {children}
    </div>
  );
}

/* Badge */
export function Badge({ children, status }) {
  const cls = status ? statusColor(status) : 'badge-gray';
  return <span className={cls}>{children}</span>;
}

/* Input */
export function Input({ label, id, error, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input id={id} className={`input ${error ? 'border-red-500' : ''} ${className}`} {...props} />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

/* Select */
export function Select({ label, id, options = [], error, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <select id={id} className={`select ${error ? 'border-red-500' : ''} ${className}`} {...props}>
        {options.map(opt => (
          typeof opt === 'string'
            ? <option key={opt} value={opt}>{opt}</option>
            : <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

/* Modal */
export function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative glass rounded-2xl shadow-2xl w-full ${sizes[size]} animate-fade-in max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-surface-border">
            <h2 className="text-lg font-semibold text-[#f0ecff]">{title}</h2>
            <button onClick={onClose} className="text-[#8885b8] hover:text-[#f0ecff] transition-colors p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* Progress Bar */
export function ProgressBar({ value, max = 100, showLabel = true, className = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1.5" style={{ color: '#8885b8' }}>
          <span>{pct}% raised</span>
        </div>
      )}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* Avatar */
export function Avatar({ initials, size = 'md', className = '' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' };
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0 ${className}`}
      style={{ background: 'linear-gradient(135deg, #1c1b3b, #2e2e7a)', color: '#fff5cb', border: '1px solid rgba(234,189,83,0.3)' }}>
      {initials}
    </div>
  );
}

/* Stat Card */
export function StatCard({ icon, label, value, sub, trend, color = 'maroon' }) {
  const colors = {
    maroon: { bg: 'rgba(28,27,59,0.5)',    icon: '#a8a5e0', border: 'rgba(46,45,92,0.8)'    },
    gold:   { bg: 'rgba(234,189,83,0.1)',  icon: '#eabd53', border: 'rgba(234,189,83,0.3)'  },
    green:  { bg: 'rgba(45,158,107,0.1)',  icon: '#4ade80', border: 'rgba(45,158,107,0.3)'  },
    blue:   { bg: 'rgba(59,130,246,0.1)',  icon: '#60a5fa', border: 'rgba(59,130,246,0.3)'  },
  };
  const c = colors[color] || colors.maroon;
  return (
    <div className="card-stat animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          <span className="text-xl" style={{ color: c.icon }}>{icon}</span>
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend >= 0 ? 'badge-green' : 'badge-maroon'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-[#f0ecff] mb-0.5">{value}</div>
      <div className="text-sm font-medium" style={{ color: '#8885b8' }}>{label}</div>
      {sub && <div className="text-xs mt-1" style={{ color: '#4a4878' }}>{sub}</div>}
    </div>
  );
}

/* Search Input */
export function SearchInput({ value, onChange, placeholder = 'Search…', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#4a4878">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-9"
      />
    </div>
  );
}

/* Empty State */
export function EmptyState({ icon = '📭', title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-[#f5ede0] mb-1">{title}</h3>
      <p className="text-sm" style={{ color: '#9e8a7a' }}>{description}</p>
    </div>
  );
}

/* Section Header */
export function SectionHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#f0ecff]">{title}</h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: '#8885b8' }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* Tabs */
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: '#111027', border: '1px solid #2e2d5c' }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            active === tab.id
              ? 'text-[#f0ecff] shadow-lg'
              : 'text-[#8885b8] hover:text-[#f0ecff]'
          }`}
          style={active === tab.id ? { background: 'linear-gradient(135deg, #1c1b3b, #2e2e7a)' } : {}}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
