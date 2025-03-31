const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema
} = require('../middleware/validationMiddleware');

// 🔓 Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

// 🔐 Protected routes (requires token)
router.use(authMiddleware.protect);

// Change password for logged-in user
router.patch('/change-password', validate(changePasswordSchema), authController.changePassword);

// Logout user (optional: blacklist or expire token logic)
router.post('/logout', authController.logout);

module.exports = router;
