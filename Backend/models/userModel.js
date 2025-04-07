// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'warden'], required: true },
  phone: String,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  profileImage: String,
  
  // Student fields
  roomNumber: { type: String },   // ✅ Add this
  block: String,
  semester: String,
  year: String,
  branch: String,
  dateOfBirth: String,
  address: String,
  guardianName: String,
  guardianPhone: String,
  bloodGroup: String,

  // Warden fields
  joiningDate: String,
  department: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
