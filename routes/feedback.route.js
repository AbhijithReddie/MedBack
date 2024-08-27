// routes/feedback.route.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

// Route to add feedback
router.post('/add', feedbackController.addFeedback);

// Route to get all feedback
router.get('/', feedbackController.getFeedbacks);
//Route to acknowledge a feedback
router.patch('/acknowledge/:id', feedbackController.acknowledgeFeedback);

module.exports = router;
