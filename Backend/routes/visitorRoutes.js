const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// Student adds visitor request
router.post('/', 
    authMiddleware.restrictTo('student'), 
    visitorController.createVisitorRequest
);

// Student views their own visitor entries
router.get('/my-visitors', 
    authMiddleware.restrictTo('student'), 
    visitorController.getMyVisitors
);

// Warden views all visitor logs
router.get('/', 
    authMiddleware.restrictTo('warden'), 
    visitorController.getAllVisitors
);

// Warden updates visitor status (e.g., approved, rejected)
router.patch('/:id', 
    authMiddleware.restrictTo('warden'), 
    visitorController.updateVisitorStatus
);

module.exports = router;
