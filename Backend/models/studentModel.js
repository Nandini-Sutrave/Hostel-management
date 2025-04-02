// models/Student.js
// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   year: Number,
//   branch: String,
//   dateOfBirth: Date,
//   address: String,
//   guardianName: String,
//   guardianPhone: String,
//   bloodGroup: String
// }, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, // ✅ Added Name
  profileImage: { type: String, default: '/default-profile.png' }, // ✅ Profile Picture
  roomNumber: { type: String, required: true }, // ✅ Room Number
  block: { type: String, required: true }, // ✅ Block
  semester: { type: String, required: true }, // ✅ Semester
  course: { type: String, required: true }, // ✅ Course
  year: Number,
  branch: String,
  dateOfBirth: Date,
  address: String,
  guardianName: String,
  guardianPhone: String,
  bloodGroup: String,
  stats: {
    attendance: { type: Number, default: 0 }, // ✅ Attendance %
    outstandingFees: { type: Number, default: 0 }, // ✅ Fees Pending
    messCredit: { type: Number, default: 0 }, // ✅ Mess Balance
    complaints: { type: Number, default: 0 } // ✅ Complaint Count
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
