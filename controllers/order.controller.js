const {cartModel} = require('../models/cart.model');
const {orderModel}=require('../models/order.model')
const {productModel}=require('../models/product.model');
const {userModel} = require('../models/user.model');
exports.getUserProducts=async (req,res)=>{
    const id=req.params.user;
    console.log("Hello")
    try{
        const order=await orderModel.findOne({userId:{$eq:id}});
        if(!order) res.json({"message":"Order not found"})
        else{
            console.log("Inside try")
            res.status(200).json({order:order})
        }
    }
    catch(err){
        res.json({"message":"Error in loading the order details!!"})
    }
}

exports.saveProduct=async (req,res)=>{
    const userId = req.params.userId;
    const modeOfPayment=req.body.modeOfPayment;
    const address=req.body.address;
    try {
        const cartItem=await cartModel.findOne({userId:{$eq:userId} });
        if(!cartItem) return res.json({message:"Cart Items Not Found"})
        else{
            const order=new orderModel({
                userId:userId,
                status:"Order Placed",
                modeOfPayment:modeOfPayment,
                address:address
            })
            let total=0;
            cartItem.items.forEach((element) => {
                const {productName,quantity,price,modeOfPayment,address}=element;
                total+=price;
                order.items.push({
                    productName:productName,
                    quantity:quantity,
                    totalPrice:(Number(quantity)*(Number(price))),
                    price:price,
                })
            });
            order.totalPrice=total;
            await order.save()
            cartItem.items.forEach((element) => {
                const {productName,quantity}=element;
                productModel.findOneAndUpdate(
                    {productName:productName},
                    {$inc:{quantity:-quantity}}
                ).exec()
                productModel.findOneAndUpdate(
                    {quantity:{$lte:0}},
                    {$set:{checkAvailable:"Out Of Stock"}}
                ).exec()     
            })
            await userModel.findOneAndUpdate(
                { _id: userId },
                { $push: { ordersList: order } }
            ).exec();      
            
            await cartModel.findOneAndDelete({userId:userId});   
            return res.status(200).json({message:"Added to Order..",status:true});      
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.placeOrder=async (req,res)=>{
    try{
        const {userId,productId,modeOfPayment,address}=req.body;
        console.log(userId)
        const sprod=await productModel.findOne({productId:{$eq:productId}});
        const {productName,price,quantity}=sprod;
        console.log(sprod.productName)
        const order=await orderModel.create({
            userId:userId,
            status:"Placed Order",
            address:address,
            modeOfPayment:modeOfPayment
        })
        order.items.push({
            productName:productName,
            quantity:1,
            price:price,
        })
        order.totalPrice=(Number(quantity)*Number(price)),
        await order.save()
        await userModel.findOneAndUpdate(
            { $push: { ordersList: order } }
        );
        res.status(200).json(order);
    }
    catch(err){res.status(404).json({message:"Error in adding order!!!"})}
}
