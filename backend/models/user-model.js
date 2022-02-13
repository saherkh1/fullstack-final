const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    cityId: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: [true, "Missing first name."]
    },
    lastName: {
        type: String,
        required: [true, "Missing last name."]
    },
    email: {
        type: String,
        required: [true, "Missing email."],
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        unique: true
    },
    idNumber: {
        type: String,
        null: false,
        required: [true, "Missing id number."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Missing Password."],
        select: false
    },
    street: {
        type: String,
        required: [true, "Missing street."]
    },
    role: String,
    verified: Boolean,
    token: String
},
    {
        versionKey: false,
        toJSON: {
            virtuals: true
        }
        , id: false
    });
UserSchema.virtual("city", {
    ref: "CityModel",
    localField: "cityId",
    foreignField: "_id",
    justOne: true
});
const UserModel = mongoose.model("UserModel", UserSchema, "Users");

module.exports = UserModel;