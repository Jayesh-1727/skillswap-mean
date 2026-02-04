const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addTeachSkill,
  addLearnSkill
} = require('../controllers/profileController');

router.post('/teach-skill', protect, addTeachSkill);
router.post('/learn-skill', protect, addLearnSkill);

module.exports = router;
