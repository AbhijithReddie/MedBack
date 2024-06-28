require('dotenv').config()
const jwt=require('jsonwebtoken')
const {userModel}=require('../models/user.model');
const { loginModel } = require('../models/login.model');
exports.authenticateAdmin=async (req,res,next)=>{
    try{

        const token=req.header('authorization').split(' ')[1]//header('authorization').split(' ')[1];
        console.log("Token from admin ",token)
        if(!token){
            res.status(401).json({access:false,mesage:"Unauthorized admin"})
        }
        jwt.verify(token,process.env.secretKey,async (err,data)=>{
            console.log("data from msg is : ",data)
            const admin=await userModel.findOne({_id:{$eq:data}})
            console.log(admin);
            if(admin.role==="admin")
                next()
        })
    }
    catch(err){
        console.log("ERROR PLEASE");
        res.json({message:"ERROR HAPPENED"});
    }
}