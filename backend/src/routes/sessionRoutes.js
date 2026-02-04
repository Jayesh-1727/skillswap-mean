const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  sendRequest,
  getTeacherRequests,
  updateRequestStatus,
  completeSession,
  addFeedback
} = require('../controllers/sessionController');

router.post('/send', protect, sendRequest);
router.get('/teacher', protect, getTeacherRequests);
router.patch('/:id/status', protect, updateRequestStatus);
router.patch('/:id/complete', protect, completeSession);
router.post('/:id/feedback', protect, addFeedback);

module.exports = router;
