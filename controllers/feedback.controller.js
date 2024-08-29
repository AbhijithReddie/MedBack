// feedback.controller.js
const Feedback = require('../models/feedback.model');
const nodemailer=require('nodemailer');
// Add new feedback
const addFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        let email=feedback.email;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'medworlddummy@gmail.com',
                pass: 'xdwu qpbl czrg hwrz' // Update with your password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const mailOptions = {
            from: 'medworlddummy@gmail.com',
            to: email,
            subject: 'Complaint Received - Thank You for Your Submission',
            html: `
                <p>Dear ${feedback.name},</p>
                
                <p>Thank you for reaching out to us. We have successfully received your complaint and it has been logged into our system.</p>
                
                <p>Your concern is important to us, and our team will review the details of your complaint as soon as possible. We will keep you updated on the progress and any actions taken to address the issue.</p>
                
                <p>If you have any additional information or questions in the meantime, please do not hesitate to contact us.</p>
                
                <p>Thank you for bringing this to our attention. We appreciate your patience and cooperation.</p>
                
                <p>Best regards,</p>
                <p>The MedWorld Team</p>
            `,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Failed to send email', error);
                return res.status(500).json({Error: 'ERROR in sending Mail' });
            }
            res.status(201).json({ message: 'Feedback submitted successfully!' });
        });
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
        let email=feedback.email;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'medworlddummy@gmail.com',
                pass: 'xdwu qpbl czrg hwrz' // Update with your password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'medworlddummy@gmail.com',
            to: email,
            subject: 'Update on Your Complaint',
            html: `
                <p>Dear ${feedback.name},</p>
                
                <p>We want to inform you that your complaint has been received and is now escalated to our administrator for further review.</p>
                
                <p>Our team is currently assessing the details of your complaint to ensure that it is addressed promptly and effectively. We take such matters seriously and strive to resolve them to your satisfaction.</p>
                
                <p>You will be updated with any progress or actions taken regarding your complaint. If you have any further information to provide or if you have additional questions, please feel free to reach out to us.</p>
                
                <p>Thank you for bringing this to our attention. We appreciate your patience and understanding as we work to resolve this issue.</p>
                
                <p>Best regards,</p>
                <p>The MedWorld Team</p>
            `,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Failed to send email', error);
                return res.status(500).json({Error: 'ERROR in sending Mail' });
            }
            res.status(200).json(feedback);
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = { addFeedback, getFeedbacks, acknowledgeFeedback };



