const Skill = require('../models/Skill');
const User = require('../models/User');

exports.searchTeachersBySkill = async (req, res) => {
  try {
    const { skill } = req.query;

    let users = await User.find({
      'skillsTeach.0': { $exists: true }
    })
    .populate('skillsTeach.skill');

    if (skill && skill.trim() !== '') {
      users = users.filter(user =>
        user.skillsTeach.some(s =>
          s.skill.name.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }

    res.json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to search teachers' });
  }
};

