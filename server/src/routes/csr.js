const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');

const proposals = [
  { id: 1, company: 'Infosys Foundation', title: 'AI Research Lab Setup', amount: 2500000, status: 'Approved', date: '2024-03-01', focusArea: 'Technology' },
  { id: 2, company: 'Cognizant Foundation', title: 'Merit Scholarship Programme', amount: 1500000, status: 'Under Review', date: '2024-04-10', focusArea: 'Scholarships' },
];
const companies = [
  { id: 1, name: 'Infosys Foundation', industry: 'Technology', csrBudget: 10000000, city: 'Bengaluru' },
  { id: 2, name: 'TCS', industry: 'Technology', csrBudget: 20000000, city: 'Mumbai' },
];

router.get('/companies', authenticate, (req, res) => res.json(companies));
router.get('/proposals', authenticate, (req, res) => res.json(proposals));
router.post('/proposals', authenticate, authorize('Admin', 'Staff'), (req, res) => {
  const p = { id: Date.now(), ...req.body, status: 'Draft', date: new Date().toISOString() };
  proposals.push(p);
  res.status(201).json(p);
});
router.patch('/proposals/:id/status', authenticate, authorize('Admin', 'Staff'), (req, res) => {
  const { status } = req.body;
  const valid = ['Draft', 'Sent', 'Under Review', 'Approved', 'Completed'];
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const p = proposals.find(p => p.id === Number(req.params.id));
  if (!p) return res.status(404).json({ error: 'Proposal not found' });
  p.status = status;
  res.json(p);
});

module.exports = router;
