const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  item: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'collected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Delivery', deliverySchema);
