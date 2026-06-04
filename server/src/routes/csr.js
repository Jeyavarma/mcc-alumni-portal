const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const CSRProposal = require('../models/CSRProposal');

router.get('/proposals', authenticate, async (req, res) => {
  try { res.json(await CSRProposal.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/proposals', authenticate, authorize('Admin', 'Staff'), async (req, res) => {
  try { res.status(201).json(await CSRProposal.create(req.body)); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/proposals/:id/status', authenticate, authorize('Admin', 'Staff'), async (req, res) => {
  try {
    const valid = ['Draft','Sent','Under Review','Approved','Completed','Rejected'];
    if (!valid.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status' });
    const p = await CSRProposal.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!p) return res.status(404).json({ error: 'Proposal not found' });
    res.json(p);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
