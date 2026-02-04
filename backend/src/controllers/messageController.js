const Message = require('../models/Message');
const SessionRequest = require('../models/SessionRequest');

exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, text } = req.body;

    const session = await SessionRequest.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.status !== 'accepted') {
      return res.status(403).json({ message: 'Chat not allowed for this session' });
    }

    if (
      session.learner.toString() !== req.user.id &&
      session.teacher.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const message = await Message.create({
      session: sessionId,
      sender: req.user.id,
      text
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;

    const session = await SessionRequest.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (
      session.learner.toString() !== req.user.id &&
      session.teacher.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const messages = await Message.find({ session: sessionId })
      .populate('sender', 'name')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
