const {loginModel}=require('../models/login.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { userModel } = require('../models/user.model');
const mailer=require('nodemailer');
// const { userModel } = require('../models/user.model');
exports.checkUser =async (req,res)=>{
    const {email,password,username}=req.body;
    console.log(email,password,typeof username);
    // console.log(a===b);
    if(!email || !password)
         res.json({message:"Email or Password cannot be empty"})
    else{
        try{
                if(!email){
                   var login=await loginModel.findOne({username:{$eq:username}})
                }
                else if(username===''){
                    login=await loginModel.findOne({email:{$eq:email}})
                }
                const originalPass=await bcrypt.compare(password,login.password)
                if(!originalPass) res.json({message:"Login Unsuccessful"})
                else {
                    // console.log(login._id.toString())
                    const user=await userModel.findOne({$or:[{email:{$eq:email}},{username:{$eq:username}}]})
                    console.log(user)
                    const token=await jwt.sign(user.toString(),process.env.secretkey)
                    // req.Headers.addItem('token',token)
                    res.status(200).json({message:"Login Successfull",token:token,role:user.role,user:user})
                }
        }
        catch(err){
            console.log(err)
            res.json({message:"ERROR!!!"})
        }
    }
}

exports.forgotPassword = async (req,res)=>{
    try{
        console.log(req.body.email);
        const transporter= mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,auth:{
                user:'medworlddummy@gmail.com',
                pass:'medworld@2024'
            }
        });
        console.log('HELLLO');
        const otp=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const mailOptions = {
            from: 'medworlddummy@gmail.com',
            to: req.body.email,
            subject: 'Request Regarding Reset Password',
            text: `OTP:${otp}`,
            html: '<b>Hello,User this is your verification OTP, please do not share..!</b>',
          };
        //   console.log(mailOptions);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
              console.log('Mail failed!! :(',error);
            else
              console.log('Mail sent to ' + mailOptions.to)
        });
    }
    catch(e){
        return res.json({status:false,Error:'ERROR in Resetting password'})
    }
}