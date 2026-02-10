const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

router.get('/user/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('skillsTeach.skill');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
  _id: user._id,            // 🔥 REQUIRED
  name: user.name,
  bio: user.bio,
  availability: user.availability,
  skillsTeach: user.skillsTeach
});
  } catch (err) {
    res.status(500).json({ message: 'Failed to load user profile' });
  }
});

module.exports = router;
