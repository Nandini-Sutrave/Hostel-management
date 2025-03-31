const express = require('express');
const router = express.Router();
const settingController = require('../Controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');

// All settings routes are protected and accessible to warden or admin only
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('warden', 'admin'));

// Update or create a setting
router.post('/', settingController.updateSetting);

// Get all settings
router.get('/', settingController.getSettings);

module.exports = router;
