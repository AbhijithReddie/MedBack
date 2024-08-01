const {cartModel} = require('../models/cart.model');
const {orderModel}=require('../models/order.model')
const {productModel}=require('../models/product.model');
const {userModel} = require('../models/user.model');
exports.getUserProducts=async (req,res)=>{
    const id=req.params.user;
    console.log("Hello")
    try{
        const order=await orderModel.find({userId:{$eq:id}});
        if(!order) res.json({"message":"Order not found"})
        else{
            console.log("Inside try ",order);
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
                const {productName,quantity,price,imageUrl,modeOfPayment,address}=element;
                total+=price;
                order.items.push({
                    imageUrl:imageUrl,
                    productName:productName,
                    quantity:quantity,
                    itemPrice:(Number(quantity)*(Number(price))),
                    price:price,
                })
            });
            order.totalPrice=total;
            order.placedDate=(new Date()).toLocaleString()
            order.expectedDate="Expected Delivery in 4 hours";
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
    console.log("From Place Order called: ",req.body);
    try{
        console.log("xxxxxxx");
        
        const userId=req.body.userId;
        const productId=req.body.productId;
        const modeOfPayment=req.body.modeOfPayment;
        const address=req.body.address;
        const sprod=await productModel.findById(productId);
        console.log(sprod);
        const {productName,price,imageUrl}=sprod;
        if (!sprod) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(sprod.productName)
        const order=await orderModel.create({
            userId:userId,
            status:"Placed Order",
            address:address,
            modeOfPayment:modeOfPayment,
            items:[{
                productName:productName,
                imageUrl:imageUrl,
                quantity:1,
                price:Number(price),
                itemPrice:Number(price),
            }],
            totalPrice:Number(price)
        })
        order.placedDate=(new Date()).toLocaleString();
        order.expectedDate="Expected Delivery in 4 hours";
        await order.save();
        await userModel.findOneAndUpdate(
            { _id: userId },
            { $push: { ordersList: order } }
        ).exec();
        console.log("Ordered Successfully ",order);
        return res.status(200).json({order:order,status:true});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({message:"Error in adding order!!!"})}
}


exports.getOrderData=async (req,res)=>{
    try{
        const users=await userModel.find({});
        console.log(typeof users);
        const fusers=users.filter(user=>user.ordersList.length!==0);
        return res.json(fusers);
    }
    catch(e){
        console.log(e);
        return res.json({message:'error in fetching orders'})
    }
}