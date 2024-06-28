const express=require('express')
const signuproutes=express.Router()
const controller=require('../controllers/signup.controller')

signuproutes.post('/',controller.saveUser)

module.exports=signuproutes;