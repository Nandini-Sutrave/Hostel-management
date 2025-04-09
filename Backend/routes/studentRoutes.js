const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


// All student routes are protected
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('student'));

// Get student profile
router.get('/profile', studentController.getProfile);

// Update student profile
router.patch('/profile', studentController.updateProfile);

// Get student attendance
router.get('/attendance', studentController.getAttendance);

// Get student fees
router.get('/fees', studentController.getFees);

// Get student room details
router.get('/room', studentController.getRoomDetails);

// Submit complaint
router.post('/complaints', studentController.submitComplaint);

// Get student complaints
router.get('/complaints', studentController.getComplaints);

router.patch(
    '/profile/upload',
    upload.single('profileImage'),
    studentController.uploadProfilePicture
  );
  

module.exports = router;
