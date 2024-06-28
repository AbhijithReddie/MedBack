const {userModel} = require("../models/user.model");
const {loginModel}=require("../models/login.model")
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
exports.saveUser=async (req, res)=>{
    try {
        const { email, password,username, mobileNumber } = req.body;
        const find=await userModel.findOne({email:{$eq:email}})
        if(find){
            
            res.status(409).json({message:"User already exists.."})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password,salt)
        const user1 = await userModel.create({
            email: email,
            password:hashedPass,
            username: username,
            mobileNumber: mobileNumber,
            ordersList:[]
            
        });
        const user2=await loginModel.create({
            email:email,
            password:hashedPass,
            username:username
        })
        res.status(200).json({"Valid":"true",message:"SignUp Successful"});
    }
    catch (err) {
        console.log(err)
        res.status(404).json({"success":"false", message: "Error in inserting document to user collection" });
    }
}
