const { userModel } = require("../models/user.model");
const { loginModel } = require("../models/login.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.saveUser = async (req, res) => {
    try {
        const { email, password, username, mobileNumber } = req.body;

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            email: email,
            password: hashedPass,
            username: username,
            mobileNumber: mobileNumber,
            ordersList: []
        });

        await loginModel.create({
            email: email,
            password: hashedPass,
            username: username
        });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: 'user' },
            'medworld',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            Valid: true,
            message: "SignUp Successful",
            token: token,
            role: 'user',
            user: {
                username: newUser.username,
                _id: newUser._id
            }
        });
    } catch (err) {
        console.error("Error in saving user:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
