const Leave = require('../models/leaveModel');
const User = require('../models/userModel'); // ✅ Replacing Student

// Student applies for leave
exports.applyLeave = async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  try {
    const leave = new Leave({
      student: req.user.id, // ✅ req.user populated from auth middleware
      startDate,
      endDate,
      reason,
      status: 'Pending'
    });

    await leave.save();
    res.status(201).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Student views own leave applications
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ student: req.user.id });
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden views all leave applications
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: 'student',
      select: 'name rollNumber role',
      match: { role: 'student' } // ✅ ensure only students' leaves show up
    });
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden approves/rejects leave
exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // should be 'Approved' or 'Rejected'

  try {
    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ success: false, error: 'Leave application not found' });
    }

    leave.status = status;
    await leave.save();
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
