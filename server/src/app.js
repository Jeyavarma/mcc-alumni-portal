const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('express-async-errors');

const authRoutes       = require('./routes/auth');
const alumniRoutes     = require('./routes/alumni');
const fundraisingRoutes= require('./routes/fundraising');
const csrRoutes        = require('./routes/csr');
const reunionRoutes    = require('./routes/reunion');
const calendarRoutes   = require('./routes/calendar');
const reportsRoutes    = require('./routes/reports');
const aiRoutes         = require('./routes/ai');

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', portal: 'MCC Alumni & Development Office', version: '1.0.0', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/alumni',      alumniRoutes);
app.use('/api/fundraising', fundraisingRoutes);
app.use('/api/csr',         csrRoutes);
app.use('/api/reunion',     reunionRoutes);
app.use('/api/calendar',    calendarRoutes);
app.use('/api/reports',     reportsRoutes);
app.use('/api/ai',          aiRoutes);

// ─── Error Handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ─── Start ────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🏛️  MCC Alumni Portal API`);
  console.log(`   Port   : ${PORT}`);
  console.log(`   Env    : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health : http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
