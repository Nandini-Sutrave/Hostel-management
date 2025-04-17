const Complaint = require('../models/complaintModel');
const Leave = require('../models/leaveModel');
const Attendance = require('../models/attendanceModel'); // ✅ Corrected
const Room = require('../models/roomModel');
const User = require('../models/userModel'); // ✅ Unified user model

// Dashboard


 

exports.getDashboardDetails = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });

    const totalRooms = await Room.countDocuments();
    const complaints = await Complaint.find();

    const wardenProfile = await User.findById(req.user._id).select('-password');

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalRooms,
        complaints,
        wardenProfile, // 👈 include this in the response
      }
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get student details
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: 'student' });
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update student details
exports.updateStudentDetails = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'student' },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create room
exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: updatedRoom });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Attendance report
exports.getAttendanceReport = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('student');
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mark bulk attendance
exports.markBulkAttendance = async (req, res) => {
  try {
    const records = await Attendance.insertMany(req.body);
    res.status(201).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('student');
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update leave status
exports.updateLeaveStatus = async (req, res) => {
  try {
    const updated = await Leave.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('student');
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
