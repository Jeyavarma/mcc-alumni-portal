const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const Campaign = require('../models/Campaign');

router.get('/campaigns', authenticate, async (req, res) => {
  try { res.json(await Campaign.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/campaigns/:id', authenticate, async (req, res) => {
  try {
    const c = await Campaign.findById(req.params.id);
    if (!c) return res.status(404).json({ error: 'Campaign not found' });
    res.json(c);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/campaigns', authenticate, authorize('Admin', 'Staff'), async (req, res) => {
  try { res.status(201).json(await Campaign.create(req.body)); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/donations', authenticate, async (req, res) => {
  try {
    const { campaignId, alumniName, amount, method } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Valid amount required' });
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    campaign.donations.push({ alumniName, amount, method: method || 'Online', donatedAt: new Date() });
    campaign.raised += Number(amount);
    campaign.donorCount += 1;
    if (campaign.raised >= campaign.goal) campaign.status = 'Completed';
    else if (campaign.raised >= campaign.goal * 0.9) campaign.status = 'Near Goal';
    await campaign.save();
    res.status(201).json({ message: 'Donation recorded', amount, campaign: campaign.title });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
