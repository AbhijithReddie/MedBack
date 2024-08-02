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
        console.log(req.body.email);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'medworlddummy@gmail.com',
                pass: 'unuh bmxl pmec ybvh'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log('HELLLO');
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const mailOptions = {
            from: 'medworlddummy@gmail.com',
            to: req.body.email,
            subject: 'Request Regarding Reset Password',
            html: `<b>Hello,User this is your verification OTP:${otp}, please do not share..!</b>`,
        };
        const login=await loginModel.findOne({email:req.body.email});
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Mail failed!! :(', error);
                return res.status(500).json({ status: false, Error: 'ERROR in Resetting password' });
            } else {
                console.log('Mail sent to ' + mailOptions.to);
                login.otp=otp;
                res.status(200).json({ status: true, message: 'OTP sent successfully' });
            }
        });
        // await loginModel.save();
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: false, Error: 'ERROR in Resetting password' });
    }
};
