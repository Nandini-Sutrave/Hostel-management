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

exports.register = async (req, res) => {
  try {
    const {
      name, email, password, role, phone, gender,
      // Student fields
      year, branch, dateOfBirth, address,
      guardianName, guardianPhone, bloodGroup,
      // Warden fields
      joiningDate, department
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      gender
    });

    if (role === 'student') {
      const student = new Student({
        user: newUser._id,
        year,
        branch,
        dateOfBirth,
        address,
        guardianName,
        guardianPhone,
        bloodGroup
      });
      await student.save();
    } else if (role === 'warden') {
      const warden = new Warden({
        user: newUser._id,
        joiningDate,
        department
      });
      await warden.save();
    }

    const token = generateToken(newUser);
    res.status(201).json({ message: 'User registered', token, user: newUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
