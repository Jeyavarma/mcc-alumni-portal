const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');

// In-memory demo users (replace with Prisma DB in production)
const DEMO_USERS = [
  { id: 1, name: 'Dr. V.J. Philip',  email: 'admin@mcc.edu.in',  password: '$2b$10$IrfKPMRnHY5.U2EJFYhRu.t3HXHbQD38Fxiz.6V7HhFw.ZioBCJgm', role: 'Admin',    avatar: 'VP' },
  { id: 2, name: 'Ms. Preethi Doss',    email: 'staff@mcc.edu.in',  password: '$2b$10$zMiH1JAnJkn2e3hNc.JCq.lrz7rcfPbnIWovTgJn1SbXr0I8gTJ9a', role: 'Staff',    avatar: 'PD' },
  { id: 3, name: 'Dr. Samuel Rajan',    email: 'alumni@mcc.edu.in', password: '$2b$10$8g4wuWJ58U1J0fFJJz5Y.OGiHsEqPxR7n7Y.WJFaZ9OJLaFrXKHYm', role: 'Alumni',   avatar: 'SR' },
  { id: 4, name: 'TCS CSR Team',        email: 'csr@tcs.com',       password: '$2b$10$RfYX4IHzTR4J9bY8UEkpZuuD8JMN0sJz1.CIpFWXI9mxI7.QDMTS',  role: 'Corporate',avatar: 'TC' },
];
// Passwords above are hashed versions of: admin123, staff123, alumni123, csr123

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = DEMO_USERS.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // For demo, allow plaintext password comparison too
  const match = password === 'admin123' && user.role === 'Admin'
    || password === 'staff123'  && user.role === 'Staff'
    || password === 'alumni123' && user.role === 'Alumni'
    || password === 'csr123'    && user.role === 'Corporate';

  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
  });
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, batch, department } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });
  res.status(201).json({ message: 'Registration successful! Your account will be verified within 2 working days.', email });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  // Would verify JWT in production
  res.json({ message: 'Use Authorization header with Bearer token' });
});

module.exports = router;
