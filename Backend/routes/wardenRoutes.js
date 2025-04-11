const express = require('express');
const router = express.Router();
const wardenController = require('../Controllers/wardenController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all warden routes
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('warden', 'admin'));

// Student management
router.get('/dashboard', wardenController.getDashboard);
router.get('/students', wardenController.getAllStudents);
router.get('/students/:id', wardenController.getStudentDetails);
router.patch('/students/:id', wardenController.updateStudentDetails);

// Room management
router.get('/rooms', wardenController.getAllRooms);
router.post('/rooms', wardenController.createRoom);
router.patch('/rooms/:id', wardenController.updateRoom);

// Attendance management
router.get('/attendance', wardenController.getAttendanceReport);
router.post('/attendance', wardenController.markBulkAttendance);

// Leave management
router.get('/leaves', wardenController.getAllLeaveRequests);
router.patch('/leaves/:id', wardenController.updateLeaveStatus);

// Complaint management
router.get('/complaints', wardenController.getAllComplaints);
router.patch('/complaints/:id', wardenController.updateComplaintStatus);

module.exports = router;
