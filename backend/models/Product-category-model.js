const mongoose = require("mongoose");
const ProductCategorySchema = mongoose.Schema({
    category: String,
}, { versionKey: false });
const ProductCategoryModel = mongoose.model("ProductCategoryModel", ProductCategorySchema, "ProductCategory");
module.exports = ProductCategoryModel;
