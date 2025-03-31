const Fee = require('../models/feeModel');
const student = require('../models/studentModel');

// Student views own fees
exports.getMyFees = async (req, res) => {
  try {
    const fees = await Fee.find({ student: req.user.id });
    res.status(200).json({ success: true, data: fees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden adds or updates fees for a student
exports.createOrUpdateFees = async (req, res) => {
  const { studentId, baseAmount, fineAmount, status } = req.body;
  try {
    let fee = await Fee.findOne({ student: studentId });
    if (fee) {
      // Update existing fee
      fee.baseAmount = baseAmount;
      fee.fineAmount = fineAmount || fee.fineAmount;
      fee.totalAmount = baseAmount + (fineAmount || fee.fineAmount);
      fee.status = status;
    } else {
      // Create new fee
      fee = new Fee({
        student: studentId,
        baseAmount,
        fineAmount: fineAmount || 0,
        totalAmount: baseAmount + (fineAmount || 0),
        status
      });
    }
    await fee.save();
    res.status(200).json({ success: true, data: fee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Warden views all students' fee details
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate('student', 'name rollNumber');
    res.status(200).json({ success: true, data: fees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
