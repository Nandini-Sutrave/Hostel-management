const express = require('express');
const router = express.Router();
const feesController = require('../Controllers/feesController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// Get fees for student
router.get('/my-fees', 
    authMiddleware.restrictTo('student'), 
    feesController.getMyFees
);

// Warden adds or updates fees for student
router.post('/', 
    authMiddleware.restrictTo('warden'), 
    feesController.createOrUpdateFees
);

// Warden gets all students' fee details
router.get('/', 
    authMiddleware.restrictTo('warden'), 
    feesController.getAllFees
);

module.exports = router;
