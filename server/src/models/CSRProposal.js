const mongoose = require('mongoose');

const csrProposalSchema = new mongoose.Schema({
  company:     { type: String, required: true },
  title:       { type: String, required: true },
  description: String,
  amount:      { type: Number, required: true },
  focusArea:   String,
  status:      { type: String, enum: ['Draft','Sent','Under Review','Approved','Completed','Rejected'], default: 'Draft' },
  officer:     String,
  nextFollowUp: Date,
  notes:       String,
  submittedAt: Date,
  approvedAt:  Date,
  completedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('CSRProposal', csrProposalSchema);
