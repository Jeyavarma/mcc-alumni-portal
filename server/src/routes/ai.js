const router = require('express').Router();
const { authenticate } = require('../middleware/auth');

const FAQ = [
  { keywords: ['profile', 'update', 'edit'], answer: 'To update your profile, go to Settings → My Profile in the sidebar.' },
  { keywords: ['donation', 'donate', 'fund'], answer: 'To donate, visit Fundraising → Active Campaigns and click "Donate Now".' },
  { keywords: ['reunion', 'event', 'jubilee'], answer: 'Check upcoming reunions under Reunion Management. Silver Jubilee (Batch 1999) is on December 14, 2024.' },
  { keywords: ['csr', 'corporate', 'proposal'], answer: 'For CSR partnerships, visit CSR & Corporate Relations. Email development@mcc.edu.in.' },
  { keywords: ['contact', 'office', 'phone'], answer: 'MCC Alumni Office: +91-44-2367-4641 | alumni@mcc.edu.in | Mon-Fri 9AM-5PM' },
];

router.post('/chat', authenticate, (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const q = message.toLowerCase();
  const match = FAQ.find(f => f.keywords.some(kw => q.includes(kw)));
  const answer = match?.answer || "I don't have a specific answer for that. Please contact alumni@mcc.edu.in.";

  // Simulate AI thinking time
  res.json({ reply: answer, source: 'FAQ', timestamp: new Date().toISOString() });
});

module.exports = router;
