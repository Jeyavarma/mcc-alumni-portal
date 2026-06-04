import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';

const DEMO_ACCOUNTS = [
  { email: 'admin@mcc.edu.in',  password: 'admin123',  role: 'Admin',    badge: '🛡️' },
  { email: 'staff@mcc.edu.in',  password: 'staff123',  role: 'Staff',    badge: '👔' },
  { email: 'alumni@mcc.edu.in', password: 'alumni123', role: 'Alumni',   badge: '🎓' },
  { email: 'csr@tcs.com',       password: 'csr123',    role: 'Corporate',badge: '🏢' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@mcc.edu.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  const quickLogin = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
  };

  return (
    <div className="min-h-screen flex" style={{
      background: '#0d0c20',
      backgroundImage: 'radial-gradient(ellipse at 30% 0%, rgba(28,27,59,0.9) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(234,189,83,0.08) 0%, transparent 60%)'
    }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 w-5/12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1c1b3b 0%, #111027 60%, #080815 100%)' }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#3d2228 1px, transparent 1px), linear-gradient(90deg, #3d2228 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(234,189,83,0.12)', border: '1px solid rgba(234,189,83,0.35)' }}>⚓</div>
            <div>
              <div className="text-xl font-bold text-[#f0ecff]">Madras Christian College</div>
              <div className="text-sm font-serif italic" style={{ color: '#eabd53' }}>Est. 1837 · In Hoc Signo</div>
            </div>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: '#f5ede0' }}>
            Alumni &<br />
            <span className="text-gradient-gold font-serif italic">Development</span><br />
            Office Portal
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#8885b8' }}>
            A unified platform for alumni relations, fundraising campaigns, CSR partnerships, and institutional development — built for MCC's legacy of excellence.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {[
            { icon: '👥', stat: '12,847', label: 'Registered Alumni' },
            { icon: '💰', stat: '₹2.87 Cr', label: 'Total Donations' },
            { icon: '🏢', stat: '24', label: 'CSR Partnerships' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(28,27,59,0.5)', border: '1px solid rgba(46,45,92,0.8)' }}>
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-sm font-bold" style={{ color: '#eabd53' }}>{item.stat}</div>
                <div className="text-xs" style={{ color: '#8885b8' }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-4xl mb-2">⚓</div>
            <h1 className="text-xl font-bold text-[#f5ede0]">MCC Alumni Portal</h1>
            <p className="text-sm font-serif italic" style={{ color: '#c8961a' }}>In Hoc Signo</p>
          </div>

          <div className="glass rounded-2xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold text-[#f0ecff] mb-1">Sign In</h1>
            <p className="text-sm mb-6" style={{ color: '#8885b8' }}>Access your alumni portal account</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="input-label">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="input-label">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center py-3 text-base">
                {loading ? (
                  <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />  Signing in…</>
                ) : 'Sign In →'}
              </Button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6">
              <div className="text-xs text-center mb-3" style={{ color: '#6b5a5f' }}>— Demo Accounts —</div>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map(acc => (
                  <button
                    key={acc.role}
                    onClick={() => quickLogin(acc)}
                    className="p-2.5 rounded-lg text-left transition-all hover:scale-105"
                    style={{ background: 'rgba(28,27,59,0.5)', border: '1px solid rgba(46,45,92,0.8)' }}
                  >
                    <div className="text-base mb-0.5">{acc.badge}</div>
                    <div className="text-xs font-semibold text-[#f0ecff]">{acc.role}</div>
                    <div className="text-[10px]" style={{ color: '#4a4878' }}>{acc.email}</div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-center mt-2" style={{ color: '#4a3538' }}>
                Click any card to auto-fill credentials
              </p>
            </div>

            {/* Register link */}
            <p className="text-center text-xs mt-5" style={{ color: '#4a4878' }}>
              New to MCC Alumni Portal?{' '}
              <Link to="/register" className="font-semibold" style={{ color: '#eabd53' }}>
                Register here →
              </Link>
            </p>
          </div>

          <p className="text-center text-xs mt-4" style={{ color: '#4a3538' }}>
            © 2024 Madras Christian College · Alumni & Development Office
          </p>
        </div>
      </div>
    </div>
  );
}
