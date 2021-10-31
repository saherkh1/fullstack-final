const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
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

const CartModel = mongoose.model("CartModel", CartSchema, "Carts");

module.exports = CartModel;