const express=require('express')
const cartroutes=express.Router()
const controller=require('../controllers/cart.controller')
const { authenticateUser } = require('../middlewares/user.middleware')

cartroutes.get('/',authenticateUser,controller.showCart)
cartroutes.post('/delete/:id',authenticateUser,controller.deleteCartItem)
cartroutes.post('/increment/:productId',authenticateUser,controller.incrementItem)
cartroutes.post('/decrement/:productId',authenticateUser,controller.decrementItem)
module.exports=cartroutes