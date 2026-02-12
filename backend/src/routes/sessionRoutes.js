const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getSessionHistory } = require('../controllers/sessionController');

const {
  sendRequest,
  getTeacherRequests,
  updateRequestStatus,
  completeSession,
  addFeedback,
  getMyRequests
} = require('../controllers/sessionController');

router.post('/send', protect, sendRequest);
router.get('/teacher', protect, getTeacherRequests);
router.patch('/:id/status', protect, updateRequestStatus);
router.get('/mine', protect, getMyRequests);
router.patch('/:id/complete', protect, completeSession);
router.post('/:id/feedback', protect, addFeedback);
router.get('/history', protect, getSessionHistory);


module.exports = router;
