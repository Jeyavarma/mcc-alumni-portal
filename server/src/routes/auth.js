const router = require('express').Router();
const User   = require('../models/User');
const { generateToken } = require('../middleware/auth');

/* ── Demo accounts (always available as fallback) ─────────── */
const DEMO_USERS = [
  { id: '1', name: 'Dr. V.J. Philip',  email: 'admin@mcc.edu.in',  password: 'admin123', role: 'Admin',    avatar: 'VP' },
  { id: '2', name: 'Ms. Preethi Doss', email: 'staff@mcc.edu.in',  password: 'staff123', role: 'Staff',    avatar: 'PD' },
  { id: '3', name: 'Dr. Samuel Rajan', email: 'alumni@mcc.edu.in', password: 'alumni123',role: 'Alumni',   avatar: 'SR' },
  { id: '4', name: 'TCS CSR Team',     email: 'csr@tcs.com',       password: 'csr123',   role: 'Corporate',avatar: 'TC' },
];

/* ──────────────────────────────────────────────────────────────
   POST /api/auth/register
────────────────────────────────────────────────────────────── */
router.post('/register', async (req, res) => {
  try {
    const {
      name, email, password,
      batch, department, programme,
      phone, company, jobTitle, city, linkedin,
    } = req.body;

    /* Validation */
    if (!name || !email || !password || !batch || !department) {
      return res.status(400).json({
        error: 'Name, email, password, batch and department are required.',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    /* Check demo account collision */
    if (DEMO_USERS.find(u => u.email === email)) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    /* Check duplicate in MongoDB */
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    /* Create user (password is hashed by pre-save hook) */
    const user = await User.create({
      name,
      email,
      password,
      role:   'Alumni',
      batch, department, programme,
      phone, company, jobTitle, city,
      linkedin,
      status: 'Pending Verification',
    });

    return res.status(201).json({
      message: 'Registration successful! Your account will be verified by the Alumni Office within 2 working days.',
      email:   user.email,
      id:      user._id,
    });

  } catch (err) {
    console.error('[register]', err.message);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

/* ──────────────────────────────────────────────────────────────
   POST /api/auth/login
────────────────────────────────────────────────────────────── */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    /* 1️⃣  Demo accounts */
    const demo = DEMO_USERS.find(u => u.email === email.toLowerCase());
    if (demo && demo.password === password) {
      const token = generateToken({ id: demo.id, email: demo.email, role: demo.role });
      return res.json({
        token,
        user: { id: demo.id, name: demo.name, email: demo.email, role: demo.role, avatar: demo.avatar },
      });
    }

    /* 2️⃣  MongoDB users */
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (user.status === 'Pending Verification') {
      return res.status(403).json({
        error: 'Your account is pending verification by the Alumni Office. Please check back in 2 working days.',
      });
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    return res.json({
      token,
      user: {
        id:     user._id,
        name:   user.name,
        email:  user.email,
        role:   user.role,
        avatar: user.avatar,
        batch:  user.batch,
        department: user.department,
      },
    });

  } catch (err) {
    console.error('[login]', err.message);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

/* ──────────────────────────────────────────────────────────────
   GET /api/auth/me
────────────────────────────────────────────────────────────── */
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided.' });

    const { verifyToken } = require('../middleware/auth');
    const decoded = verifyToken(token);

    // For real users fetch fresh from DB
    if (decoded.id && decoded.id.length > 4) {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found.' });
      return res.json({ user });
    }

    // Demo user
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
});

module.exports = router;
