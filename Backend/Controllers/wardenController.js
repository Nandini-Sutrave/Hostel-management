// controllers/wardenController.js
const Complaint = require('../models/complaintModel');
const Leave = require('../models/leaveModel');
const Attendance = require('../models/leaveModel');
const Room = require('../models/roomModel');
const Student = require('../models/studentModel');

exports.getDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalRooms = await Room.countDocuments();
    const complaints = await Complaint.find({ status: 'pending' });
    res.status(200).json({ success: true, data: { totalStudents, totalRooms, complaints } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateStudentDetails = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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

exports.getAttendanceReport = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('student');
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.markBulkAttendance = async (req, res) => {
  try {
    const records = await Attendance.insertMany(req.body);
    res.status(201).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('student');
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('student');
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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
