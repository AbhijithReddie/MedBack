const express=require('express')
const adminroutes=express.Router()
const controller=require('../controllers/product.controller')
const { authenticateAdmin } = require('../middlewares/admin.middleware')

adminroutes.get('/',authenticateAdmin,controller.getProduct)

adminroutes.post('/addProduct',authenticateAdmin,controller.productSave)

adminroutes.get('/delete/:id',authenticateAdmin,controller.productDelete)

adminroutes.get('/product/:id',authenticateAdmin,controller.getProductData)

adminroutes.post('/productEdit/:id',authenticateAdmin,controller.productEditSave)

module.exports=adminroutes