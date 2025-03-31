// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: Date,
  status: { type: String, enum: ['Present', 'Absent', 'Leave'] }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
