const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addTeachSkill,
  addLearnSkill,
  getMyProfile,
  updateMyProfile
} = require('../controllers/profileController');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);
router.post('/teach-skill', protect, addTeachSkill);
router.post('/learn-skill', protect, addLearnSkill);


module.exports = router;
