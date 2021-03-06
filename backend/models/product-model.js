const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Product Category required"],
        
    },
    name: {
        type: String,
        required: [true, "Product name required"],
        
    },
    price: {
        type: Number,
        required: [true, "Product price required"],
        
    },
    image: String
},
    {
        versionKey: false,
        toJSON: { virtuals: true }
        , id: false
    });
ProductSchema.virtual("category", { //add another field with this name
    ref: "ProductCategoryModel", // Foreign collection model
    localField: "productCategoryId", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "Products");

module.exports = ProductModel;