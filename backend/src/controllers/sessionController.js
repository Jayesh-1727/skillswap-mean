const SessionRequest = require('../models/SessionRequest');
const Skill = require('../models/Skill');
const User = require('../models/User');

exports.sendRequest = async (req, res) => {
  try {
    const { teacherId, skillId } = req.body;

    // Limit pending requests
    const pendingCount = await SessionRequest.countDocuments({
      learner: req.user.id,
      status: 'pending'
    });

    if (pendingCount >= 3) {
      return res.status(400).json({
        message: 'You already have 3 pending requests'
      });
    }

    // Prevent duplicate request
    const existingRequest = await SessionRequest.findOne({
      learner: req.user.id,
      teacher: teacherId,
      skill: skillId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
      return res.status(400).json({
        message: 'Request already exists for this skill and teacher'
      });
    }

    const request = await SessionRequest.create({
      learner: req.user.id,
      teacher: teacherId,
      skill: skillId
    });

    res.status(201).json({ message: 'Session request sent', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTeacherRequests = async (req, res) => {
  try {
    const requests = await SessionRequest.find({
      teacher: req.user.id
    })
      .populate('learner', 'name')
      .populate('skill', 'name');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await SessionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    res.json({ message: 'Request updated', request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeSession = async (req, res) => {
  try {
    const session = await SessionRequest.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only teacher can complete session' });
    }

    session.status = 'completed';
    await session.save();

    res.json({ message: 'Session marked as completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const session = await SessionRequest.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.learner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only learner can give feedback' });
    }

    if (session.status !== 'completed') {
      return res.status(400).json({ message: 'Session not completed yet' });
    }

    session.rating = rating;
    session.review = review;
    await session.save();

    const sessions = await SessionRequest.find({
  teacher: session.teacher,
  rating: { $exists: true }
});

const avgRating =
  sessions.reduce((sum, s) => sum + s.rating, 0) / sessions.length;

await User.findByIdAndUpdate(session.teacher, {
  rating: avgRating.toFixed(1)
});

    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await SessionRequest.find({
      $or: [
        { learner: userId },
        { teacher: userId }
      ],
      status: { $in: ['completed', 'rejected'] }
    })
      .populate('learner', 'name')
      .populate('teacher', 'name')
      .populate('skill', 'name')
      .sort({ updatedAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};