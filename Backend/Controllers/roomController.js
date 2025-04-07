const Room = require('../models/roomModel');
const User = require('../models/userModel'); // ✅ Replacing Student

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get room details (with occupants populated)
exports.getRoomDetails = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('occupants');
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Allocate room to student
exports.allocateRoom = async (req, res) => {
  const { studentId, roomId } = req.body;

  try {
    const student = await User.findOne({ _id: studentId, role: 'student' }); // ✅ Ensure it's a student
    const room = await Room.findById(roomId);

    if (!student || !room) {
      return res.status(404).json({ success: false, error: 'Student or Room not found' });
    }

    student.roomNumber = roomId;
    await student.save();

    room.occupants.push(studentId); // ✅ Should match Room schema field
    await room.save();

    res.status(200).json({ success: true, message: 'Room allocated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update room details
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
