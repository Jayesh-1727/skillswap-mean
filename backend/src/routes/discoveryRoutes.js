const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { searchTeachersBySkill } = require('../controllers/discoveryController');

router.get('/search', protect, searchTeachersBySkill);

module.exports = router;
