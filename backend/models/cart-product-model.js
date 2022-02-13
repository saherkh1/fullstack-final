const mongoose = require("mongoose");

const CartProductSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "productId required"],
        
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "cartId required"],
        
    },
    quantity: {
        type: Number,
        required: [true, "Quantity required"],
        default: 1
    },
    itemsPrice: {
        type: Number,
        required: [true, "Item price required"],
    },
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