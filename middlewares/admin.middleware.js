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

            if(err) return res.json({message:"Not Authorised"})
            console.log("data from msg is : ",data)
            // const admin=await userModel.findOne({email:data.email});
            // console.log(admin);
            console.log(typeof data);
            const obj=JSON.parse(data);
            console.log(typeof obj);
            const {role}=obj
            console.log(role);
            if(role==='admin')
                next()
            else console.log('Error admin');
        })
    }
    catch(err){
        console.log("ERROR PLEASE");
        res.json({message:"ERROR HAPPENED"});
    }
}