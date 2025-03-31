const Delivery = require('../models/deliveryModel');
const Student = require('../models/studentModel');

// Warden adds a new delivery for a student
exports.createDelivery = async (req, res) => {
  try {
    const { studentId, item, status } = req.body;

    if (!studentId || !item) {
      return res.status(400).json({ success: false, error: 'Student ID and item are required' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    const delivery = await Delivery.create({
      student: studentId,
      item,
      status: status || 'pending'
    });

    res.status(201).json({ success: true, data: delivery });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden views all delivery logs
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('student', 'name rollNumber roomNumber');
    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Student views their own deliveries
exports.getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden updates delivery status (e.g., to "collected")
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ success: false, error: 'Delivery not found' });
    }

    delivery.status = status || delivery.status;
    await delivery.save();

    res.status(200).json({ success: true, data: delivery });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
