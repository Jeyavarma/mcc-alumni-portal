const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');

router.get('/:type', authenticate, authorize('Admin', 'Staff'), (req, res) => {
  const { type } = req.params;
  const validTypes = ['alumni', 'donations', 'csr', 'reunion', 'department', 'annual'];
  if (!validTypes.includes(type)) return res.status(400).json({ error: 'Invalid report type' });

  // In production: generate PDF with Puppeteer/PDFKit and stream it
  res.json({
    message: `${type} report generation initiated`,
    reportType: type,
    generatedAt: new Date().toISOString(),
    downloadUrl: `/api/reports/download/${type}-${Date.now()}.pdf`,
    note: 'PDF generation requires Puppeteer setup in production'
  });
});

module.exports = router;
