const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

// Student gets all notices
router.get('/', 
    authMiddleware.restrictTo('student', 'warden'), 
    noticeController.getAllNotices
);

// Warden creates a new notice
router.post('/', 
    authMiddleware.restrictTo('warden'), 
    noticeController.createNotice
);

// Warden deletes a notice
router.delete('/:id', 
    authMiddleware.restrictTo('warden'), 
    noticeController.deleteNotice
);

module.exports = router;
