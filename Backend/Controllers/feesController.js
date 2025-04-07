const Fee = require('../models/feeModel');
const User = require('../models/userModel'); // ✅ Updated

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
  const { studentId, baseAmount, fineAmount = 0, status } = req.body;

  try {
    let fee = await Fee.findOne({ student: studentId });

    if (fee) {
      // Update existing fee
      fee.baseAmount = baseAmount;
      fee.fineAmount = fineAmount;
      fee.totalAmount = baseAmount + fineAmount;
      fee.status = status;
    } else {
      // Create new fee
      fee = new Fee({
        student: studentId,
        baseAmount,
        fineAmount,
        totalAmount: baseAmount + fineAmount,
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
    const fees = await Fee.find().populate({
      path: 'student',
      select: 'name rollNumber role',
      match: { role: 'student' } // ✅ ensures only student users are fetched
    });
    res.status(200).json({ success: true, data: fees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
