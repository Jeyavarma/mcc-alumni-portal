const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  eventDate:   { type: Date, required: true },
  category:    { type: String, enum: ['Communication','CSR','Fundraising','Department','Reunion','Reporting','General'], default: 'General' },
  reminderDate:Date,
  createdBy:   String,
}, { timestamps: true });

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
