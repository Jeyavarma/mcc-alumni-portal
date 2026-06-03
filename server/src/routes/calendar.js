const router = require('express').Router();
const { authenticate } = require('../middleware/auth');

const events = [
  { id: 1, title: 'Monthly Alumni Newsletter', date: '2024-05-01', category: 'Communication' },
  { id: 2, title: 'CSR Follow-Up Round — Q2', date: '2024-05-15', category: 'CSR' },
  { id: 3, title: 'Fundraising Campaign Review', date: '2024-05-20', category: 'Fundraising' },
];

router.get('/', authenticate, (req, res) => {
  const { month, year } = req.query;
  let filtered = events;
  if (month && year) {
    filtered = events.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() + 1 === Number(month) && d.getFullYear() === Number(year);
    });
  }
  res.json(filtered);
});
router.post('/', authenticate, (req, res) => {
  const e = { id: Date.now(), ...req.body };
  events.push(e);
  res.status(201).json(e);
});
router.delete('/:id', authenticate, (req, res) => {
  const idx = events.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  events.splice(idx, 1);
  res.json({ message: 'Event deleted' });
});

module.exports = router;
