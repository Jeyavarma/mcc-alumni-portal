import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
  'English', 'Tamil', 'History', 'Economics', 'Philosophy',
  'Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology',
  'Commerce', 'Computer Science', 'Business Administration',
  'Social Work', 'Psychology', 'Fine Arts', 'Music',
];

const BATCHES = Array.from({ length: 55 }, (_, i) => String(2024 - i));

const PROGRAMMES = ['B.A.', 'B.Sc.', 'B.Com.', 'B.B.A.', 'M.A.', 'M.Sc.', 'M.Com.', 'M.Phil.', 'Ph.D.'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 2-step form
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1 — Account
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2 — Alumni Info
    batch: '',
    department: '',
    programme: '',
    phone: '',
    company: '',
    jobTitle: '',
    city: '',
    linkedin: '',
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  /* ── Validation ────────────────────────────────────────────── */
  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim())         e.name = 'Full name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email address';
    if (form.password.length < 6)  e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword)
                                   e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.batch)      e.batch = 'Please select your batch year';
    if (!form.department) e.department = 'Please select your department';
    if (!form.programme)  e.programme = 'Please select your programme';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    const result = await register(form);
    setLoading(false);

    if (result.success) {
      toast.success('Registration submitted! Verification pending.');
      navigate('/login');
    } else {
      toast.error(result.message || 'Registration failed. Please try again.');
      if (result.field === 'email') {
        setStep(1);
        setErrors({ email: result.message });
      }
    }
  };

  /* ── Field component ────────────────────────────────────────── */
  const Field = ({ label, id, error, children }) => (
    <div className="space-y-1">
      <label htmlFor={id} className="input-label">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
    </div>
  );

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: '#0d0c20',
        backgroundImage:
          'radial-gradient(ellipse at 70% 0%, rgba(28,27,59,0.9) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(234,189,83,0.06) 0%, transparent 60%)',
      }}
    >
      {/* ── Left panel ────────────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-5/12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1c1b3b 0%, #111027 60%, #080815 100%)' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#2e2d5c 1px, transparent 1px), linear-gradient(90deg, #2e2d5c 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: 'rgba(234,189,83,0.12)', border: '1px solid rgba(234,189,83,0.35)' }}
          >
            ⚓
          </div>
          <div>
            <div className="text-xl font-bold text-[#f0ecff]">Madras Christian College</div>
            <div className="text-sm font-serif italic" style={{ color: '#eabd53' }}>
              Est. 1837 · In Hoc Signo
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: '#f0ecff' }}>
            Join the<br />
            <span className="text-gradient-gold font-serif italic">Alumni</span>
            <br />Network
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#8885b8' }}>
            Register to connect with 12,800+ fellow MCC alumni, participate in reunions,
            donate to campaigns, and stay connected with your alma mater.
          </p>

          {/* Benefits */}
          {[
            { icon: '🎓', text: 'Access reunion events & RSVPs' },
            { icon: '💰', text: 'Donate to department campaigns' },
            { icon: '👥', text: 'Connect with batchmates worldwide' },
            { icon: '📰', text: 'Receive alumni news & updates' },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: 'rgba(234,189,83,0.1)', border: '1px solid rgba(234,189,83,0.25)' }}
              >
                {b.icon}
              </div>
              <span className="text-sm" style={{ color: '#a8a5e0' }}>{b.text}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-xs" style={{ color: '#2e2d5c' }}>
          © 2024 Madras Christian College · Alumni &amp; Development Office
        </div>
      </div>

      {/* ── Right panel — Form ────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-lg animate-fade-in">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-4xl mb-2">⚓</div>
            <h1 className="text-xl font-bold text-[#f0ecff]">MCC Alumni Portal</h1>
            <p className="text-sm font-serif italic" style={{ color: '#eabd53' }}>In Hoc Signo</p>
          </div>

          <div className="glass rounded-2xl p-8 shadow-2xl">

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#f0ecff] mb-1">Create Account</h2>
              <p className="text-sm" style={{ color: '#8885b8' }}>
                Register as an MCC alumni member
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-7">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      background: step >= s
                        ? 'linear-gradient(135deg, #eabd53, #f5e89a)'
                        : 'rgba(46,45,92,0.5)',
                      color: step >= s ? '#111027' : '#4a4878',
                    }}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: step >= s ? '#eabd53' : '#4a4878' }}
                  >
                    {s === 1 ? 'Account Details' : 'Alumni Information'}
                  </span>
                  {s < 2 && (
                    <div
                      className="flex-1 h-px ml-1"
                      style={{ background: step > s ? '#eabd53' : '#2e2d5c' }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ── STEP 1: Account Details ────────────────────── */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <Field label="Full Name *" id="reg-name" error={errors.name}>
                  <input
                    id="reg-name"
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    className="input"
                    placeholder="Dr. / Mr. / Ms. Your Full Name"
                    autoFocus
                  />
                </Field>

                <Field label="Email Address *" id="reg-email" error={errors.email}>
                  <input
                    id="reg-email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    className="input"
                    placeholder="your@email.com"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Password *" id="reg-password" error={errors.password}>
                    <input
                      id="reg-password"
                      type="password"
                      value={form.password}
                      onChange={set('password')}
                      className="input"
                      placeholder="Min. 6 characters"
                    />
                  </Field>
                  <Field label="Confirm Password *" id="reg-confirm" error={errors.confirmPassword}>
                    <input
                      id="reg-confirm"
                      type="password"
                      value={form.confirmPassword}
                      onChange={set('confirmPassword')}
                      className="input"
                      placeholder="Repeat password"
                    />
                  </Field>
                </div>

                <button
                  onClick={handleNext}
                  className="btn-gold w-full justify-center py-3 text-base mt-2"
                >
                  Continue → Alumni Info
                </button>
              </div>
            )}

            {/* ── STEP 2: Alumni Information ─────────────────── */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">

                <div className="grid grid-cols-3 gap-3">
                  <Field label="Programme *" id="reg-prog" error={errors.programme}>
                    <select
                      id="reg-prog"
                      value={form.programme}
                      onChange={set('programme')}
                      className="select"
                    >
                      <option value="">Select</option>
                      {PROGRAMMES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Department *" id="reg-dept" error={errors.department}>
                    <select
                      id="reg-dept"
                      value={form.department}
                      onChange={set('department')}
                      className="select"
                    >
                      <option value="">Select</option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Batch Year *" id="reg-batch" error={errors.batch}>
                    <select
                      id="reg-batch"
                      value={form.batch}
                      onChange={set('batch')}
                      className="select"
                    >
                      <option value="">Year</option>
                      {BATCHES.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Phone Number" id="reg-phone">
                    <input
                      id="reg-phone"
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      className="input"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </Field>
                  <Field label="Current City" id="reg-city">
                    <input
                      id="reg-city"
                      type="text"
                      value={form.city}
                      onChange={set('city')}
                      className="input"
                      placeholder="Chennai"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Current Company / Organisation" id="reg-company">
                    <input
                      id="reg-company"
                      type="text"
                      value={form.company}
                      onChange={set('company')}
                      className="input"
                      placeholder="e.g. ISRO, TCS, TNPSC…"
                    />
                  </Field>
                  <Field label="Designation / Job Title" id="reg-title">
                    <input
                      id="reg-title"
                      type="text"
                      value={form.jobTitle}
                      onChange={set('jobTitle')}
                      className="input"
                      placeholder="Senior Engineer…"
                    />
                  </Field>
                </div>

                <Field label="LinkedIn Profile URL" id="reg-linkedin">
                  <input
                    id="reg-linkedin"
                    type="url"
                    value={form.linkedin}
                    onChange={set('linkedin')}
                    className="input"
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </Field>

                {/* Notice */}
                <div
                  className="p-3 rounded-lg text-xs"
                  style={{
                    background: 'rgba(234,189,83,0.08)',
                    border: '1px solid rgba(234,189,83,0.2)',
                    color: '#8885b8',
                  }}
                >
                  ℹ️ Your account will be reviewed by the Alumni Office within{' '}
                  <span style={{ color: '#eabd53' }}>2 working days</span>. You'll receive
                  a confirmation email once approved.
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setErrors({}); }}
                    className="btn-ghost flex-1 justify-center py-3"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold flex-1 justify-center py-3 text-base"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-[#111027]/30 border-t-[#111027] rounded-full" />
                        Submitting…
                      </>
                    ) : (
                      '✓ Submit Registration'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer link */}
            <p className="text-center text-xs mt-5" style={{ color: '#4a4878' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-medium" style={{ color: '#eabd53' }}>
                Sign In →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
