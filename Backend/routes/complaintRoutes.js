const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// Student submits a complaint
router.post('/', 
    authMiddleware.restrictTo('student'), 
    complaintController.submitComplaint
);

// Student views own complaints
router.get('/my-complaints', 
    authMiddleware.restrictTo('student'), 
    complaintController.getMyComplaints
);

// Warden views all complaints
router.get('/', 
    authMiddleware.restrictTo('warden'), 
    complaintController.getAllComplaints
);

// Warden updates complaint status
router.patch('/:id', 
    authMiddleware.restrictTo('warden'), 
    complaintController.updateComplaintStatus
);

module.exports = router;
