const {profileModel} =require('../models/profile.model');


exports.getProfileData=async(req,res)=>{
    const userId=req.body.userId;
    try{
        const profile=await profileModel.findOne({userId:userId});
        console.log(profile);
        if(!profile){
            return res.status(404).json({message:"Profile Not Found"});
        }
        return res.status(200).json(profile);
    }
    catch(e){
        console.log(e)
        return res.status(404).json({message:"Error in fetching Profile Data"});
    }
}

exports.addProfileData=async (req,res)=>{
    const pdata=req.body.profileData;
    const id=req.body.userId;
    console.log(pdata);
    try{
        const {fullName,email,phoneNumber,gender,address,medicalCondition,specificCondition,otherCondition}=pdata;
        console.log("Medical Conition is ",medicalCondition);
        const prof=await profileModel.findOne({userId:id});
        if(!prof){
            const pmodel=await profileModel.create({
                userId:id,
                fullName:fullName,
                email:email,
                phoneNumber:phoneNumber,
                gender:gender,
                address:address,
                medicalCondition:medicalCondition,
                specificCondition:[],
                otherCondition:otherCondition
            })
            for(let i=0;i<specificCondition.length;i++){
                pmodel.specificCondition.push(specificCondition[i]);
            }
            await pmodel.save();
            return res.status(200).json({pmodel});
        }
        const pupdate=await profileModel.findOneAndUpdate({userId:id},
            {$set:{
                fullName:fullName,
                email:email,
                phoneNumber:phoneNumber,
                gender:gender,
                address:address,
                medicalCondition:medicalCondition,
                otherCondition:otherCondition
            }}
        ).exec();
        pupdate.specificCondition=[];
        for(let i=0;i<specificCondition.length;i++){
            pupdate.specificCondition.push(specificCondition[i]);
        }
        await pupdate.save();
        console.log("_-----------------------");
        console.log("Updated: ",pupdate);
        return res.status(200).json(pupdate);
    }
    catch(e){return res.json({message:'Error in adding Profile'})}
}

exports.editProfile=async (req,res)=>{
    console.log("EDIT");
}