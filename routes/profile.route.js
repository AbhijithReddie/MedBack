const express=require('express')

const profileRoutes=express.Router()
const controller=require('../controllers/profile.controller')

profileRoutes.post('/',controller.getProfileData);
profileRoutes.post('/edit',controller.editProfile);
profileRoutes.post('/add',controller.addProfileData);

module.exports=profileRoutes;