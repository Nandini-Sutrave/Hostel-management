// models/Warden.js
const mongoose = require('mongoose');

const wardenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  joiningDate: Date,
  department: String
}, { timestamps: true });

module.exports = mongoose.model('Warden', wardenSchema);
