const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    cartId: mongoose.Schema.Types.ObjectId,
    cityId: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    street: String,
    shippingDate: Date,
    orderDate: Date,
    cardNumber: Number,
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
 OrderSchema.virtual("city", {
    ref: "CityModel",
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});
OrderSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});
const OrderModel = mongoose.model("OrderModel", OrderSchema, "Orders");

module.exports = UserModel;