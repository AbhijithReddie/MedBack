const express=require('express')
const checkRoute=express.Router()
const controller=require('../controllers/checkUser.controller')

checkRoute.get('/username/:username',controller.checkingUserName)
checkRoute.get('/password/:password',controller.checkingPassword)

module.exports=checkRoute;