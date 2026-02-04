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
