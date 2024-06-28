const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:0,
        required:true
    },
    prescriptionRequired:{
        type:Boolean,
        required:true
    },
    checkAvailable:{
        type:String,
        default:"Availble",
        required:true
    }
});
const productModel = mongoose.model("product", productSchema);
module.exports = {productModel,productSchema};