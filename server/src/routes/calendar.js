const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const CalendarEvent = require('../models/CalendarEvent');

router.get('/', authenticate, async (req, res) => {
  try {
    const { month, year } = req.query;
    const query = {};
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end   = new Date(year, month, 0, 23, 59, 59);
      query.eventDate = { $gte: start, $lte: end };
    }
    res.json(await CalendarEvent.find(query).sort({ eventDate: 1 }));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', authenticate, async (req, res) => {
  try { res.status(201).json(await CalendarEvent.create(req.body)); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
