const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/User');

// GET /api/alumni  — list with filters
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, dept, batch, engagement, page = 1, limit = 20 } = req.query;
    const query = { role: 'Alumni' };
    if (dept && dept !== 'All')       query.department = dept;
    if (batch && batch !== 'All')     query.batch = batch;
    if (engagement && engagement !== 'All') query.engagementStatus = engagement;
    if (search) {
      const re = new RegExp(search, 'i');
      query.$or = [{ name: re }, { email: re }, { company: re }, { city: re }];
    }
    const total = await User.countDocuments(query);
    const data  = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    res.json({ data, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/alumni/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const a = await User.findById(req.params.id).select('-password');
    if (!a) return res.status(404).json({ error: 'Alumni not found' });
    res.json(a);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/alumni
router.post('/', authenticate, authorize('Admin', 'Staff'), async (req, res) => {
  try {
    const a = await User.create({ ...req.body, role: 'Alumni', status: 'Active' });
    res.status(201).json(a);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/alumni/:id
router.put('/:id', authenticate, authorize('Admin', 'Staff'), async (req, res) => {
  try {
    const { password, ...rest } = req.body;   // never update password via this route
    const a = await User.findByIdAndUpdate(req.params.id, rest, { new: true }).select('-password');
    if (!a) return res.status(404).json({ error: 'Alumni not found' });
    res.json(a);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
