const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');


// Protect all room routes
router.use(authMiddleware.protect);

// Get all rooms (warden only)
router.get(
  '/',
  authMiddleware.restrictTo('warden'),
  roomController.getAllRooms
);

// Get specific room details (warden & student)
router.get(
  '/:id',
  authMiddleware.restrictTo('warden', 'student'),
  roomController.getRoomDetails
);

// Allocate room (warden only)
router.post(
  '/allocate',
  authMiddleware.restrictTo('warden'),
  roomController.allocateRoom
);

// Update room details (warden only)
router.patch(
  '/:id',
  authMiddleware.restrictTo('warden'),
  roomController.updateRoom
);

module.exports = router;
