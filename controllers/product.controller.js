const {productModel}=require('../models/product.model')

exports.getProduct=async (req,res)=>{
    try{
        const prod=await productModel.find({})
        res.status(200).json(prod)
    }catch(err){res.json({"message":"Error in loading the data!!"})}
}

exports.getHomeProduct=async (req,res)=>{
    try{
        const prod=await productModel.find({})
        res.status(200).json(prod)
    }catch(err){res.json({"message":"Error in loading the data!!"})}
}

exports.getProductData=async (req,res)=>{
    const id=req.params.id;
    try{
        const prod=await productModel.findOne({productId:{$eq:id}});
        if(!prod) res.json({"message":"Product not found"})
        else res.status(200).json(prod)
    }catch(err){
        res.json({"message":"Error in loading the product data!!"})
    }
}

exports.productEditSave=async (req,res)=>{
    const id=req.params.id;
    try{
        const prod=await productModel.findOneAndUpdate({productId:{$eq:id}},{
            imageUrl:req.body.imageUrl,
            productName:req.body.productName,
            price:req.body.price,
            description:req.body.description,
            quantity:req.body.quantity
        });
        if(!prod) res.json({"message":"Product not found"})
        else res.status(200).json(prod)
    }catch(err){
        res.json({"message":"Error in loading the product data!!"})
    }
}

exports.productSave=async (req,res)=>{
    try{
        const id=req.body.productId
        const prod=await productModel.create({
            productId:req.body.productId,
            imageUrl:req.body.imageUrl,
            productName:req.body.productName,
            price:req.body.price,
            description:req.body.description,
            quantity:prod.quantity+req.body.quantity,
            prescriptionRequired:req.body.prescriptionRequired
        });
        res.status(200).json(prod)
    }catch(err){
        res.json({"message":"Error in adding the product!!"})
    }
}

exports.productDelete=async (req,res)=>{
    const id=req.params.id;
    try{
        const prod=await productModel.findOneAndDelete({productId:{$eq:id}});
        if(!prod) res.json({"message":"Product not found"})
        else res.status(200).json(prod)
    }catch(err){
        res.json({"message":"Error in deleting the product!!"})
    }
}

