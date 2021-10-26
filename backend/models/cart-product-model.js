const mongoose = require("mongoose");

const CartProductSchema = mongoose.Schema({
    productId:  { type: mongoose.Schema.Types.ObjectId, unique: true },
    quantity: Number,
    itemsPrice: Number,
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
CartProductSchema.virtual("product", {
    ref: "ProductModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

const CartProductModel = mongoose.model("CartProductModel", CartProductSchema, "CartProducts");

module.exports = CartProductModel;