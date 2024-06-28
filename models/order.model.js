const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        auto:true,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    items:{
        type:[{
            productName:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number,
                required:true
            }
        }],
        default:[]
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    status:{
        type:String,
        required:true
    },
});
const orderModel = mongoose.model("order", orderSchema);
module.exports = {orderModel,orderSchema};