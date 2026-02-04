const User = require('../models/User');
const Skill = require('../models/Skill');

exports.addTeachSkill = async (req, res) => {
  const { skillName, level } = req.body;

  let skill = await Skill.findOne({ name: skillName });
  if (!skill) {
    skill = await Skill.create({ name: skillName });
  }

  const user = await User.findById(req.user.id);

  user.skillsTeach.push({
    skill: skill._id,
    level
  });

  await user.save();

  res.json({ message: 'Teach skill added' });
};

exports.addLearnSkill = async (req, res) => {
  const { skillName } = req.body;

  let skill = await Skill.findOne({ name: skillName });
  if (!skill) {
    skill = await Skill.create({ name: skillName });
  }

  const user = await User.findById(req.user.id);

  user.skillsLearn.push({
    skill: skill._id
  });

  await user.save();

  res.json({ message: 'Learn skill added' });
};
