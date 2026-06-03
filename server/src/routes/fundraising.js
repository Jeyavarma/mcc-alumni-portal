const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');

const campaigns = [
  { id: 1, title: 'Physics Laboratory Modernisation', dept: 'Physics', goal: 2500000, raised: 1875000, donors: 47, deadline: '2024-12-31', status: 'Active' },
  { id: 2, title: 'Bishop Heber Library Restoration Fund', dept: 'General', goal: 5000000, raised: 3200000, donors: 128, deadline: '2025-03-31', status: 'Active' },
  { id: 3, title: 'Merit Scholarship Endowment — Batch 2000', dept: 'All', goal: 1000000, raised: 980000, donors: 89, deadline: '2024-06-30', status: 'Near Goal' },
];

router.get('/campaigns', authenticate, (req, res) => res.json(campaigns));
router.get('/campaigns/:id', authenticate, (req, res) => {
  const c = campaigns.find(c => c.id === Number(req.params.id));
  if (!c) return res.status(404).json({ error: 'Campaign not found' });
  res.json(c);
});
router.post('/campaigns', authenticate, authorize('Admin', 'Staff'), (req, res) => {
  const c = { id: Date.now(), ...req.body, raised: 0, donors: 0, status: 'Active' };
  campaigns.push(c);
  res.status(201).json(c);
});
router.post('/donations', authenticate, (req, res) => {
  const { alumniId, campaignId, amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Valid amount required' });
  res.status(201).json({ message: 'Donation recorded', amount, campaignId, alumniId, date: new Date().toISOString() });
});

module.exports = router;
