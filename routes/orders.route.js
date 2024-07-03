const express=require('express')
const orderroutes=express.Router()
const controller=require('../controllers/order.controller')
const {authenticateUser}=require('../middlewares/user.middleware')
orderroutes.post('/saveOrder/:userId',authenticateUser,controller.saveProduct)
orderroutes.post('/:user',controller.getUserProducts)
orderroutes.post('/placeOrder',controller.placeOrder)

module.exports=orderroutes