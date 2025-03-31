const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// Student - apply and view leave
router.post('/apply', authMiddleware.restrictTo('student'), leaveController.applyLeave);
router.get('/my-leaves', authMiddleware.restrictTo('student'), leaveController.getMyLeaves);

// Warden - view and respond to leave requests
router.get('/all', authMiddleware.restrictTo('warden'), leaveController.getAllLeaves);

// Single route to update leave status (approve/reject)
router.patch('/status/:id', authMiddleware.restrictTo('warden'), leaveController.updateLeaveStatus);

module.exports = router;
