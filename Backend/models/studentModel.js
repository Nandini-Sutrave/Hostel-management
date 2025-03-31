// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  year: Number,
  branch: String,
  dateOfBirth: Date,
  address: String,
  guardianName: String,
  guardianPhone: String,
  bloodGroup: String
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
