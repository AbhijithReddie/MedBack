const express=require('express')
const orderroutes=express.Router()
const controller=require('../controllers/order.controller')
const {authenticateUser}=require('../middlewares/user.middleware')
orderroutes.post('/saveOrder/:userId',controller.saveProduct)
orderroutes.post('/placeOrder',authenticateUser,controller.placeOrder)
orderroutes.post('/:user',controller.getUserProducts)

module.exports=orderroutes