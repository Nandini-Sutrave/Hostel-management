// controllers/roomController.js
const Room = require('../models/roomModel');
const Student = require('../models/studentModel');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRoomDetails = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('students');
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.allocateRoom = async (req, res) => {
  const { studentId, roomId } = req.body;
  try {
    const student = await Student.findById(studentId);
    const room = await Room.findById(roomId);

    if (!student || !room) {
      return res.status(404).json({ success: false, error: 'Student or Room not found' });
    }

    student.roomNumber = roomId;
    await student.save();

    room.students.push(studentId);
    await room.save();

    res.status(200).json({ success: true, message: 'Room allocated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: updatedRoom });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};