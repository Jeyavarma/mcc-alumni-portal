const router = require('express').Router();
const { authenticate } = require('../middleware/auth');

const events = [
  { id: 1, title: 'Silver Jubilee — Batch 1999', type: 'Silver Jubilee', batch: '1999', date: '2024-12-14', venue: 'Bishop Heber Hall', invitesSent: 120, rsvpYes: 87, rsvpNo: 15, rsvpMaybe: 18, status: 'Upcoming' },
  { id: 2, title: 'Golden Jubilee — Batch 1974', type: 'Golden Jubilee', batch: '1974', date: '2024-11-23', venue: 'Centenary Auditorium', invitesSent: 95, rsvpYes: 62, rsvpNo: 10, rsvpMaybe: 23, status: 'Upcoming' },
];

router.get('/events', authenticate, (req, res) => res.json(events));
router.get('/events/:id', authenticate, (req, res) => {
  const e = events.find(e => e.id === Number(req.params.id));
  if (!e) return res.status(404).json({ error: 'Event not found' });
  res.json(e);
});
router.post('/rsvp', authenticate, (req, res) => {
  const { eventId, alumniId, status } = req.body;
  if (!['Yes', 'No', 'Maybe'].includes(status)) return res.status(400).json({ error: 'Invalid RSVP status' });
  res.status(201).json({ message: 'RSVP recorded', eventId, alumniId, status });
});

module.exports = router;
