// models/Complaint.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  category: { type: String, enum: ['Plumbing', 'Electricity', 'Cleaning', 'Other'] },
  description: String,
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
