require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const mongoose   = require('mongoose');

const app = express();

/* ── CORS ─────────────────────────────────────────────────── */
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ── MongoDB Connection ───────────────────────────────────── */
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mcc_portal';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected:', mongoose.connection.host);
    seedDemoData();   // seed on first connect
  })
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

mongoose.connection.on('error', err =>
  console.error('MongoDB runtime error:', err.message)
);

/* ── Seed demo data (runs once if collections are empty) ──── */
async function seedDemoData() {
  try {
    const User     = require('./models/User');
    const Campaign = require('./models/Campaign');
    const CSRProposal  = require('./models/CSRProposal');
    const ReunionEvent = require('./models/ReunionEvent');
    const CalendarEvent= require('./models/CalendarEvent');

    // Seed campaigns
    const campCount = await Campaign.countDocuments();
    if (campCount === 0) {
      await Campaign.insertMany([
        { title: 'Physics Laboratory Modernisation', department: 'Physics', goal: 2500000, raised: 1875000, donorCount: 47, deadline: new Date('2024-12-31'), status: 'Active', imageEmoji: '🔬', description: 'Upgrade undergraduate physics lab with state-of-the-art equipment.' },
        { title: 'Bishop Heber Library Restoration Fund', department: 'General', goal: 5000000, raised: 3200000, donorCount: 128, deadline: new Date('2025-03-31'), status: 'Active', imageEmoji: '📚', description: 'Restore and digitise the historic Bishop Heber Library.' },
        { title: 'Merit Scholarship Endowment — Batch 2000', department: 'All Departments', goal: 1000000, raised: 980000, donorCount: 89, deadline: new Date('2024-06-30'), status: 'Near Goal', imageEmoji: '🎓', description: 'Establish a permanent endowment for merit scholarships.' },
      ]);
      console.log('🌱 Seeded campaigns');
    }

    // Seed CSR proposals
    const csrCount = await CSRProposal.countDocuments();
    if (csrCount === 0) {
      await CSRProposal.insertMany([
        { company: 'Infosys Foundation', title: 'AI Research Lab Setup', amount: 2500000, status: 'Approved', focusArea: 'Technology', officer: 'Dr. Rajan' },
        { company: 'Cognizant Foundation', title: 'Merit Scholarship Programme 2024-25', amount: 1500000, status: 'Under Review', focusArea: 'Scholarships', officer: 'Ms. Preethi' },
        { company: 'TCS', title: 'Smart Classroom Infrastructure', amount: 3500000, status: 'Sent', focusArea: 'Infrastructure', officer: 'Mr. Vincent' },
      ]);
      console.log('🌱 Seeded CSR proposals');
    }

    // Seed reunion events
    const reunCount = await ReunionEvent.countDocuments();
    if (reunCount === 0) {
      await ReunionEvent.insertMany([
        { title: 'Silver Jubilee Reunion — Batch of 1999', type: 'Silver Jubilee', batch: '1999', eventDate: new Date('2024-12-14'), venue: 'Bishop Heber Hall, MCC Campus', invitesSent: 120, status: 'Upcoming', description: 'Celebrate 25 glorious years since graduation!' },
        { title: 'Golden Jubilee Reunion — Batch of 1974', type: 'Golden Jubilee', batch: '1974', eventDate: new Date('2024-11-23'), venue: 'Centenary Auditorium, MCC', invitesSent: 95, status: 'Upcoming', description: '50 years of friendship, learning, and legacy!' },
      ]);
      console.log('🌱 Seeded reunion events');
    }

    // Seed calendar events
    const calCount = await CalendarEvent.countDocuments();
    if (calCount === 0) {
      await CalendarEvent.insertMany([
        { title: 'Monthly Alumni Newsletter', eventDate: new Date('2024-05-01'), category: 'Communication' },
        { title: 'CSR Follow-Up Round — Q2', eventDate: new Date('2024-05-15'), category: 'CSR' },
        { title: 'Fundraising Campaign Review', eventDate: new Date('2024-05-20'), category: 'Fundraising' },
        { title: 'Silver Jubilee Invitation Blast', eventDate: new Date('2024-06-20'), category: 'Reunion' },
      ]);
      console.log('🌱 Seeded calendar events');
    }

  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

/* ── Routes ───────────────────────────────────────────────── */
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/alumni',      require('./routes/alumni'));
app.use('/api/fundraising', require('./routes/fundraising'));
app.use('/api/csr',         require('./routes/csr'));
app.use('/api/reunion',     require('./routes/reunion'));
app.use('/api/calendar',    require('./routes/calendar'));
app.use('/api/reports',     require('./routes/reports'));
app.use('/api/ai',          require('./routes/ai'));

/* ── Health check ─────────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db:  mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env: process.env.NODE_ENV,
    ts:  new Date().toISOString(),
  });
});

/* ── 404 ──────────────────────────────────────────────────── */
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

/* ── Global error handler ─────────────────────────────────── */
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

/* ── Start server ─────────────────────────────────────────── */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 MCC API running on port ${PORT} [${process.env.NODE_ENV}]`)
);
