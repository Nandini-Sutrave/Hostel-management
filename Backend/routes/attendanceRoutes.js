const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// Student views own attendance
router.get('/my-attendance', 
    authMiddleware.restrictTo('student'), 
    attendanceController.getMyAttendance
);

// Warden marks attendance
router.post('/', 
    authMiddleware.restrictTo('warden'), 
    attendanceController.markAttendance
);

// Warden views attendance report
router.get('/', 
    authMiddleware.restrictTo('warden'), 
    attendanceController.getAttendanceReport
);

module.exports = router;
