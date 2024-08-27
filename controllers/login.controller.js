const { loginModel } = require('../models/login.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');
const nodemailer = require('nodemailer');

exports.checkUser = async (req, res) => {
    const { email, password, username } = req.body;
    console.log(email, password, typeof username);
    if (!email || !password)
        res.json({ message: "Email or Password cannot be empty" });
    else {
        try {
            let login;
            if (!email) {
                login = await loginModel.findOne({ username: { $eq: username } });
            } else if (username === '') {
                login = await loginModel.findOne({ email: { $eq: email } });
            }
            const originalPass = await bcrypt.compare(password, login.password);
            if (!originalPass) res.json({ message: "Login Unsuccessful" });
            else {
                const user = await userModel.findOne({ $or: [{ email: { $eq: email } }, { username: { $eq: username } }] });
                console.log(user);
                const token = await jwt.sign(user.toString(), process.env.secretkey);
                res.status(200).json({ message: "Login Successful", token: token, role: user.role, user: user });
            }
        } catch (err) {
            console.log(err);
            res.json({ message: "ERROR!!!" });
        }
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        
        // Hash the OTP with a salt
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp.toString(), salt);

        // Configure the mail transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'medworlddummy@gmail.com',
                pass: 'your-email-password' // Update with your password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'medworlddummy@gmail.com',
            to: email,
            subject: 'Request Regarding Reset Password',
            html: `<b>Hello, this is your verification OTP: ${otp}. Please do not share it.</b>`,
        };

        const login = await loginModel.findOne({ email });
        if (!login) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        // Store the hashed OTP and expiration time in the database
        login.otp = hashedOtp;
        login.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await login.save();

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Failed to send email', error);
                return res.status(500).json({ status: false, Error: 'ERROR in sending OTP' });
            }
            res.status(200).json({ status: true, message: 'OTP sent successfully' });
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: false, Error: 'ERROR in resetting password' });
    }
};


exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const login = await loginModel.findOne({ email });
        if (!login) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        // Check if the OTP has expired
        if (login.otpExpires < Date.now()) {
            return res.status(400).json({ status: false, message: 'OTP has expired' });
        }

        // Compare the provided OTP with the hashed OTP stored in the database
        const isOtpValid = await bcrypt.compare(otp.toString(), login.otp);
        if (!isOtpValid) {
            return res.status(400).json({ status: false, message: 'Invalid OTP' });
        }

        // OTP is valid and not expired, proceed with password reset or other actions
        res.status(200).json({ status: true, message: 'OTP verified successfully' });

        // Optionally, invalidate the OTP after successful verification
        login.otp = null;
        login.otpExpires = null;
        await login.save();

    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: false, Error: 'ERROR in verifying OTP' });
    }
};

