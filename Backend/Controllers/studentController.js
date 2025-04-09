const User = require('../models/userModel');
const Attendance = require('../models/attendanceModel');
const Fee = require('../models/feeModel');
const Room = require('../models/roomModel');
const Complaint = require('../models/complaintModel');

// Get logged-in student profile
exports.getProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get student attendance
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.user.id });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get student fees
exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.user.id });
    res.status(200).json({ success: true, data: fees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get room details
exports.getRoomDetails = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).populate('roomNumber');
    res.status(200).json({ success: true, data: student.roomNumber });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Submit a new complaint
exports.submitComplaint = async (req, res) => {
  const { title, description } = req.body;

  try {
    const complaint = new Complaint({
      student: req.user.id,
      title,
      description,
      status: 'pending'
    });

    await complaint.save();
    res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get own complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Optional: Delete a specific complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndDelete({
      _id: req.params.id,
      student: req.user.id
    });

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    res.status(200).json({ success: true, message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Optional: Mark complaint as resolved
exports.resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndUpdate(
      { _id: req.params.id, student: req.user.id },
      { status: 'resolved' },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// controllers/studentController.js

//const Student = require('../models/UserModel');

exports.uploadProfilePicture = async (req, res) => {
  try {
    const studentId = req.user.id; // assuming you're using auth middleware that sets req.user
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const imagePath = `/uploads/profileImage/${req.file.filename}`;

    const updatedStudent = await User.findByIdAndUpdate(
      studentId,
      { profileImage: imagePath },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};
