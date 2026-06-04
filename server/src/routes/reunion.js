const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const ReunionEvent = require('../models/ReunionEvent');

router.get('/events', authenticate, async (req, res) => {
  try { res.json(await ReunionEvent.find().sort({ eventDate: 1 })); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/events/:id', authenticate, async (req, res) => {
  try {
    const e = await ReunionEvent.findById(req.params.id);
    if (!e) return res.status(404).json({ error: 'Event not found' });
    res.json(e);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/rsvp', authenticate, async (req, res) => {
  try {
    const { eventId, alumniName, status, guestCount } = req.body;
    if (!['Yes','No','Maybe'].includes(status)) return res.status(400).json({ error: 'Invalid RSVP status' });
    const event = await ReunionEvent.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    event.rsvps.push({ alumniName, status, guestCount: guestCount || 0 });
    await event.save();
    res.status(201).json({ message: 'RSVP recorded', status });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
