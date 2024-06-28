const express=require('express')
const orderroutes=express.Router()
const controller=require('../controllers/order.controller')
const {authenticateUser}=require('../middlewares/user.middleware')
orderroutes.post('/saveOrder',authenticateUser,controller.saveProduct)
orderroutes.post('/',authenticateUser,controller.getUserProducts)
orderroutes.post('/placeOrder',authenticateUser,controller.placeOrder)

module.exports=orderroutes