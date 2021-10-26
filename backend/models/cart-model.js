const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    cartProducts: [mongoose.Schema.Types.ObjectId],
    createDate: Date,
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
CartSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});
CartSchema.virtual("cartProduct", {
    ref: "CartProductModel",
    localField: "cartProducts",
    foreignField: "_id",
    justOne: false
});

const CartModel = mongoose.model("CartModel", CartSchema, "Carts");

module.exports = CartModel;