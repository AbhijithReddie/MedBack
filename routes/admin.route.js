const express=require('express')
const adminroutes=express.Router()
const controller=require('../controllers/product.controller')
const { authenticateAdmin } = require('../middlewares/admin.middleware')

adminroutes.post('/',controller.getProduct)

adminroutes.post('/addProduct',controller.productSave)

adminroutes.post('/delete/:id',controller.productDelete)

adminroutes.post('/product/:id',controller.getProductData)

adminroutes.post('/productEdit/:id',controller.productEditSave)

module.exports=adminroutes