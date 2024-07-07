const mongoose = require("mongoose");
const {userModel}=require("./user.model")

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    items:{
        type:[{
            cartItemID:{
                type:String,
                required:true
            }, 
            imageUrl:{
                type:String
            },    
            productName:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            prescription:{
                type:Boolean,
                required:true
            },
            pricePerUnit:{
                type:Number,
            }
            }],
        default:[]
    }
});
const cartModel = mongoose.model("cart", cartSchema);
module.exports = {cartModel,cartSchema};
