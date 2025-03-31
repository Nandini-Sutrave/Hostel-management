const Attendance = require('../models/attendanceModel');
const Student = require('../models/studentModel');

// Student views own attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.user.id });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden marks attendance
exports.markAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    const attendance = new Attendance({ student: studentId, date, status });
    await attendance.save();
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden views attendance report
exports.getAttendanceReport = async (req, res) => {
  try {
    const report = await Attendance.find().populate('student', 'name rollNumber');
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
