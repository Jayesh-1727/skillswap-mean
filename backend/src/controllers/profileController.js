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

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('skillsTeach.skill')
      .populate('skillsLearn.skill');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
  name: user.name,
  email: user.email,
  role: user.role,
  bio: user.bio,
  availability: user.availability,
  skillsTeach: user.skillsTeach,
  skillsLearn: user.skillsLearn
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const { bio, availability } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio, availability },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      bio: user.bio,
      availability: user.availability
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};





