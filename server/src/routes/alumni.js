const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');

// Mock data — replace with Prisma queries in production
const alumni = require('../../data/alumni.json');

// GET /api/alumni  — list with filters
router.get('/', authenticate, (req, res) => {
  const { search, dept, batch, engagement, page = 1, limit = 20 } = req.query;
  let results = [...alumni];
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q)
    );
  }
  if (dept && dept !== 'All') results = results.filter(a => a.dept === dept);
  if (batch && batch !== 'All') results = results.filter(a => a.batch === batch);
  if (engagement && engagement !== 'All') results = results.filter(a => a.engagement === engagement);

  const total = results.length;
  const start = (page - 1) * limit;
  const data = results.slice(start, start + Number(limit));

  res.json({ data, total, page: Number(page), limit: Number(limit) });
});

// GET /api/alumni/:id
router.get('/:id', authenticate, (req, res) => {
  const a = alumni.find(a => a.id === Number(req.params.id));
  if (!a) return res.status(404).json({ error: 'Alumni not found' });
  res.json(a);
});

// POST /api/alumni
router.post('/', authenticate, authorize('Admin', 'Staff'), (req, res) => {
  const newAlumni = { id: Date.now(), ...req.body, donationTotal: 0, engagement: 'Active', lastContact: new Date().toISOString() };
  alumni.push(newAlumni);
  res.status(201).json(newAlumni);
});

// PUT /api/alumni/:id
router.put('/:id', authenticate, authorize('Admin', 'Staff'), (req, res) => {
  const idx = alumni.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Alumni not found' });
  alumni[idx] = { ...alumni[idx], ...req.body };
  res.json(alumni[idx]);
});

module.exports = router;
