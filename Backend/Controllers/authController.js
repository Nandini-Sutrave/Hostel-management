const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Warden = require('../models/wardenModel');

// In-memory reset token store (for simplicity)
let resetTokens = {};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const path = require('path');
const fs = require('fs');


exports.register = async (req, res) => {
  try {
    const {
      name, email, password, phone, gender, role,
      roomNumber, block, semester, year, branch,
      dateOfBirth, address, guardianName, guardianPhone, bloodGroup,
      joiningDate, department
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Check if student room number is already taken in same block
    if (role === 'student' && roomNumber && block) {
      const roomTaken = await User.findOne({
        role: 'student',
        roomNumber,
        block
      });

      if (roomTaken) {
        return res.status(400).json({ message: 'Same room number not allowed in a block' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      gender
    });

    // Add student-specific fields
    if (role === 'student') {
      Object.assign(newUser, {
        roomNumber,
        block,
        semester,
        year,
        branch,
        dateOfBirth,
        address,
        guardianName,
        guardianPhone,
        bloodGroup
      });
    }

    // Add warden-specific fields
    if (role === 'warden') {
      Object.assign(newUser, {
        joiningDate,
        department
      });
    }

    // Handle profile image if uploaded
    if (req.file) {
      newUser.profileImage = req.file.path;
    }

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Something went wrong during registration' });
  }
};







exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    resetTokens[resetToken] = user._id;

    // In a real application, you'd send this via email
    res.json({ message: 'Reset token generated', resetToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const userId = resetTokens[token];
    if (!userId) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashed });

    delete resetTokens[token];
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Old password incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  // If using JWT, logout is client-side (by deleting token)
  res.json({ message: 'Logout successful' });
};
