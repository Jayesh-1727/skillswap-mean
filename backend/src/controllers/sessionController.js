const SessionRequest = require('../models/SessionRequest');
const Skill = require('../models/Skill');

exports.sendRequest = async (req, res) => {
  try {
    const { teacherId, skillId } = req.body;

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
