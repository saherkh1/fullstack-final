const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "user id required"]
    },
    createDate: {
        type: Date,
        required: [true, "cart date required"],
        default: Date.now
    }
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