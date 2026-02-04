const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  sendRequest,
  getTeacherRequests,
  updateRequestStatus
} = require('../controllers/sessionController');

router.post('/send', protect, sendRequest);
router.get('/teacher', protect, getTeacherRequests);
router.patch('/:id/status', protect, updateRequestStatus);

module.exports = router;
