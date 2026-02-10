const Skill = require('../models/Skill');
const User = require('../models/User');

exports.searchTeachersBySkill = async (req, res) => {
  try {
    const { skill } = req.query;

    const foundSkill = await Skill.findOne({ name: skill.toLowerCase() });
    if (!foundSkill) {
      return res.json([]);
    }

    const teachers = await User.find({
      'skillsTeach.skill': foundSkill._id
    })
      .select('name bio skillsTeach role')
      .populate('skillsTeach.skill', 'name');

    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchTeachersBySkill = async (req, res) => {
  const { skill } = req.query;

  try {
    // Find users who teach at least one skill
    let users = await User.find({
      'skillsTeach.0': { $exists: true }
    }).populate('skillsTeach.skill');

    // If skill query exists, filter by skill name
    if (skill) {
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