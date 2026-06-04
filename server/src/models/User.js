const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role:     { type: String, enum: ['Admin', 'Staff', 'Alumni', 'Corporate'], default: 'Alumni' },
  avatar:   { type: String },
  isActive: { type: Boolean, default: true },
  status:   { type: String, enum: ['Active', 'Pending Verification', 'Suspended'], default: 'Pending Verification' },

  // Alumni-specific fields
  batch:      { type: String },
  department: { type: String },
  programme:  { type: String },
  phone:      { type: String },
  company:    { type: String },
  jobTitle:   { type: String },
  city:       { type: String },
  country:    { type: String, default: 'India' },
  linkedin:   { type: String },
  bio:        { type: String },

  donationTotal:   { type: Number, default: 0 },
  engagementStatus:{ type: String, default: 'Active' },
  lastContactDate: { type: Date },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Auto-generate avatar initials
userSchema.pre('save', function (next) {
  if (!this.avatar && this.name) {
    this.avatar = this.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
