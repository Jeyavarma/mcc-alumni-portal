const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  alumniId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' },
  alumniName: String,
  status:     { type: String, enum: ['Yes','No','Maybe'], default: 'Maybe' },
  guestCount: { type: Number, default: 0 },
  notes:      String,
  respondedAt:{ type: Date, default: Date.now },
});

const reunionEventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  type:        { type: String, enum: ['Silver Jubilee','Golden Jubilee','Diamond Jubilee','Annual Meet','Departmental','Special'] },
  batch:       String,
  eventDate:   { type: Date, required: true },
  venue:       String,
  description: String,
  status:      { type: String, enum: ['Planning','Upcoming','Completed','Cancelled'], default: 'Upcoming' },
  invitesSent: { type: Number, default: 0 },
  maxCapacity: Number,
  rsvps:       [rsvpSchema],
}, { timestamps: true });

module.exports = mongoose.model('ReunionEvent', reunionEventSchema);
