const productModel = require('../models/product.model');

exports.getProduct = async (req, res) => {
    try {
        const prod = await productModel.find({}, '-__v'); // Exclude the '__v' field if not needed
        res.status(200).json(prod);
    } catch (err) {
        res.status(500).json({ message: "Error in loading the data!!" });
    }
};

exports.getHomeProduct = async (req, res) => {
    try {
        const prod = await productModel.find({}, '-__v'); // Exclude the '__v' field if not needed
        res.status(200).json(prod);
    } catch (err) {
        res.status(500).json({ message: "Error in loading the data!!" });
    }
};

exports.getProductData = async (req, res) => {
    const id = req.params.id;
    try {
        const prod = await productModel.findOne({ productId: id }, '-__v'); // Exclude the '__v' field if not needed
        if (!prod) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json({ message: "Error in loading the product data!!" });
    }
};

exports.getProdData = async (req, res) => {
    const id = req.params.id;
    try {
        const prod = await productModel.findById(id, '-__v'); // Exclude the '__v' field if not needed
        if (!prod) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json({ message: "Error in loading the product data!!" });
    }
};

exports.productEditSave = async (req, res) => {
    const id = req.params.id;
    const { imageUrl, productName, price, description, quantity, categories } = req.body.updatedProduct;

    try {
        const prod = await productModel.findOneAndUpdate(
            { productId: id },
            {
                imageUrl: imageUrl,
                productName: productName,
                price: price,
                description: description,
                quantity: quantity,
                categories: categories // Update categories field
            },
            { new: true, useFindAndModify: false }
        );
        
        if (!prod) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json({ message: "Error in updating the product data!!" });
    }
};

exports.productSave = async (req, res) => {
    try {
        const {
            productId,
            imageUrl,
            productName,
            price,
            description,
            quantity,
            prescriptionRequired,
            categories // Include categories field
        } = req.body;

        const prod = await productModel.create({
            productId: productId,
            imageUrl: imageUrl,
            productName: productName,
            price: price,
            description: description,
            quantity: quantity,
            prescriptionRequired: prescriptionRequired,
            categories: categories // Save categories field
        });

        res.status(200).json(prod);
    } catch (err) {
        res.status(500).json({ message: "Error in adding the product!!" });
    }
};

exports.productDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const prod = await productModel.findOneAndDelete({ productId: id });
        if (!prod) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json({ message: "Error in deleting the product!!" });
    }
};
