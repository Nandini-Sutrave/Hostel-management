// controllers/visitorController.js
const Visitor = require('../models/visitorModel');

exports.createVisitorRequest = async (req, res) => {
  try {
    const visitor = await Visitor.create({
      student: req.user.id,
      name: req.body.name,
      relation: req.body.relation,
      status: 'pending'
    });
    res.status(201).json({ success: true, data: visitor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMyVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({ student: req.user.id });
    res.status(200).json({ success: true, data: visitors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate('student');
    res.status(200).json({ success: true, data: visitors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateVisitorStatus = async (req, res) => {
  try {
    const updated = await Visitor.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

