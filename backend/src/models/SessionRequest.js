const mongoose = require('mongoose');

const sessionRequestSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('SessionRequest', sessionRequestSchema);
