// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  capacity: Number,
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
