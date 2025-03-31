// models/Visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  visitorName: String,
  entryTime: Date,
  exitTime: Date
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
