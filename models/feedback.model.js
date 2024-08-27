// feedback.model.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    acknowledged: {
        type: Boolean,
        default: false // Default to false meaning the feedback is unacknowledged
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
