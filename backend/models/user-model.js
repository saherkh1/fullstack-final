const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    cityId: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    idNumber: { type: String, unique: true },
    password: { type: String, select: false },
    street: String,
    role: String,
    verified: Boolean,
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, id: false
    });
UserSchema.virtual("city", {
    ref: "CityModel",
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});
const UserModel = mongoose.model("UserModel", UserSchema, "Users");

module.exports = UserModel;