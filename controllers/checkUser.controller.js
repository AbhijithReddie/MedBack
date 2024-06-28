const { userModel } = require("../models/user.model");

exports.checkingUserName = async (req,res)=>{
    const username=req.params.username;
    if(username.length<8){ 
       return res.json({message:"Username should be of minimum 8 characters",status:false})
    }
    const user=await userModel.findOne({username:username})
    console.log(user);
    if(user) return res.json({message:"Username Already Exists",status:false})
    return res.json({message:"Username Available",status:true})
}

exports.checkingPassword = async (req,res)=>{
    const password=req.params.password;
    if(!password.match(/^(?=.*[a-z].*[a-z])(?=.*\d)(?=.*[A-Z].*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/)){
        return res.json({message:"Password should be 8 charcters atleast and contain minimum 2 small letters,2 capital letters,1 digit and 1 spcial character",status:false})
    }
    return res.json({message:"Valid Password",status:true})
}