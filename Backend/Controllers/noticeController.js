const Notice = require('../models/noticeModel');

// GET: Get all notices (Student and Warden)
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST: Warden creates a new notice
exports.createNotice = async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, error: 'Title and message are required' });
    }

    const notice = await Notice.create({
      title,
      message,
      postedBy: req.user.id // assuming JWT middleware attaches user info
    });

    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE: Warden deletes a notice by ID
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ success: false, error: 'Notice not found' });
    }

    res.status(200).json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
