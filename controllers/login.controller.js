const {loginModel}=require('../models/login.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { userModel } = require('../models/user.model');
// const { userModel } = require('../models/user.model');
exports.checkUser =async (req,res)=>{
    const {email,password,username}=req.body;
    if(!email || !password)
         res.json({message:"Email or Password cannot be empty"})
    else{
        try{
                let login=null;
                if(email!=undefined){
                    login=await loginModel.findOne({email:{$eq:email}})
                }
                else if(username!=undefined){
                    login=await loginModel.findOne({username:username})
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