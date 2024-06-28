const mongoose = require("mongoose");
const {cartModel}=require("./cart.model")
const {orderSchema}=require("./order.model")
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    active:{
        type:Boolean,
        default:true,
        required:true
    },
    
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart',
        auto:true
    },
    ordersList:{
        type:[orderSchema],
        default:[],
        required:true
    }
});
const userModel = mongoose.model("user", userSchema);
module.exports = {userModel,userSchema};