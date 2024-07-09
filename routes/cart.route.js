const express=require('express')
const cartroutes=express.Router()
const controller=require('../controllers/cart.controller')
const { authenticateUser } = require('../middlewares/user.middleware')

cartroutes.post('/addtocart/:id',controller.addToCart)
cartroutes.post('/delete/:id',controller.deleteCartItem)
cartroutes.post('/increment/:productId',controller.incrementItem)
cartroutes.post('/decrement/:productId',controller.decrementItem)
cartroutes.post('/',controller.showCart)
module.exports=cartroutes