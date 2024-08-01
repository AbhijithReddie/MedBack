const express=require('express')
const loginroutes=express.Router()
const controller=require('../controllers/login.controller')
loginroutes.post('/reset',controller.forgotPassword);
loginroutes.post('/',controller.checkUser)
module.exports=loginroutes;