// feedback.controller.js
const Feedback = require('../models/feedback.model');

// Add new feedback
const addFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all feedbacks ordered by the latest first
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ timestamp: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const acknowledgeFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { acknowledged: true },
            { new: true }
        );
        if (!feedback) return res.status(404).send('Feedback not found');
        res.json(feedback);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = { addFeedback, getFeedbacks, acknowledgeFeedback };



