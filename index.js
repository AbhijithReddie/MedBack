require("dotenv").config()
const express=require('express')
const app=express();
const port=process.env.PORT;
const signUpRoute=require('./routes/signup.route')
const loginRoute=require('./routes/login.route')
const cartRoute=require('./routes/cart.route')
const adminRoute=require('./routes/admin.route')
const orderRoute=require('./routes/orders.route')
const homeRoute=require('./routes/home.route')
const checkRoute=require('./routes/checkUser.route')
const cors=require('cors');
app.use(express.json());
app.use(cors());
const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/testDb')
.then(()=>console.log("Successful connection"));

app.use('/signup',signUpRoute)
app.use('/login',loginRoute)
app.use('/home',homeRoute)
app.use('/admin',adminRoute)
app.use('/cart',cartRoute)
app.use('/orders',orderRoute)
app.use('/checkUser',checkRoute)

app.listen(port,()=>{
    console.log(`Server listening at port ${port}..`)
})