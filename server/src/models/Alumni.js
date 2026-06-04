const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  type:      { type: String, enum: ['Email', 'Call', 'WhatsApp', 'Meeting', 'Letter'] },
  subject:   String,
  content:   String,
  status:    { type: String, enum: ['Completed', 'Follow-Up Due', 'Pending', 'Cancelled'], default: 'Completed' },
  officer:   String,
  followUpDate: Date,
  notes:     String,
  communicatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const alumniSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  phone:     String,
  batch:     { type: String, required: true },
  department:{ type: String, required: true },
  programme: String,
  company:   String,
  jobTitle:  String,
  city:      String,
  country:   { type: String, default: 'India' },
  linkedin:  String,
  bio:       String,
  avatar:    String,
  engagementStatus: { type: String, enum: ['Active','Moderately Active','Donor','Inactive','Lost'], default: 'Active' },
  donationTotal: { type: Number, default: 0 },
  lastContactDate: Date,
  status:    { type: String, enum: ['Active', 'Pending Verification'], default: 'Pending Verification' },
  communications: [communicationSchema],
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);
