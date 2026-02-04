const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['learner', 'teacher', 'both'],
    default: 'learner'
  },
  bio: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    default: ''
  },
  skillsTeach: [
  {
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    level: { type: String, enum: ['beginner', 'intermediate', 'expert'] }
  }
],
skillsLearn: [
  {
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }
  }
],

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
