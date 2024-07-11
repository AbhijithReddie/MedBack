const express=require('express')
const adminroutes=express.Router()
const controller=require('../controllers/product.controller')
const { authenticateAdmin } = require('../middlewares/admin.middleware')
const ordercontrol=require('../controllers/order.controller')

adminroutes.post('/product/:id',controller.getProductData)
adminroutes.post('/getOrders',ordercontrol.getOrderData)
adminroutes.post('/addProduct',controller.productSave)
adminroutes.post('/delete/:id',controller.productDelete)
adminroutes.post('/productEdit/:id',controller.productEditSave)
adminroutes.post('/',controller.getProduct)

module.exports=adminroutes