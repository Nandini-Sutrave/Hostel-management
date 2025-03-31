// models/Setting.js
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
