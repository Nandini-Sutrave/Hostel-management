const Complaint = require('../models/complaintModel');

// Student submits a complaint
exports.submitComplaint = async (req, res) => {
  const { title, description } = req.body;
  try {
    const complaint = new Complaint({
      student: req.user.id,
      title,
      description,
      status: 'Pending'
    });
    await complaint.save();
    res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Student views own complaints
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden views all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('student', 'name rollNumber');
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden updates complaint status
exports.updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ success: false, error: 'Complaint not found' });
    }
    complaint.status = status;
    await complaint.save();
    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
