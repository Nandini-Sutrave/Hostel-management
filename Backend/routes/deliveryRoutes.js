const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// Student views their own deliveries
router.get('/my-deliveries',
  authMiddleware.restrictTo('student'),
  deliveryController.getMyDeliveries
);

// Warden views all delivery entries
router.get('/',
  authMiddleware.restrictTo('warden'),
  deliveryController.getAllDeliveries
);

// Warden creates a new delivery entry
router.post('/',
  authMiddleware.restrictTo('warden'),
  deliveryController.createDelivery
);

// Warden updates delivery status (e.g., collected)
router.patch('/:id',
  authMiddleware.restrictTo('warden'),
  deliveryController.updateDeliveryStatus
);

module.exports = router;
