const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Cart ID required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user ID required"],
    },
    totalPrice: {
        type: Number,
        required: [true, "price required"],
        min: [0, "price can't be negative"],
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "City ID required"],
    },
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

module.exports = OrderModel;