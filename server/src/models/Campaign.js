const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  alumniId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' },
  alumniName: String,
  amount:     { type: Number, required: true },
  method:     { type: String, default: 'Online' },
  txnRef:     String,
  donatedAt:  { type: Date, default: Date.now },
});

const campaignSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  department:  { type: String, required: true },
  goal:        { type: Number, required: true },
  raised:      { type: Number, default: 0 },
  donorCount:  { type: Number, default: 0 },
  status:      { type: String, enum: ['Draft','Active','Near Goal','Completed','Paused'], default: 'Active' },
  startDate:   { type: Date, default: Date.now },
  deadline:    Date,
  imageEmoji:  { type: String, default: '🎓' },
  donations:   [donationSchema],
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
