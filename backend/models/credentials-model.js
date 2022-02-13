const mongoose = require("mongoose");

const CredentialsSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [4, "Password must be minimum three chars."]
    }
},
    { versionKey: false });
const CredentialsModel = mongoose.model("CredentialsModel", CredentialsSchema, "Users");

module.exports = CredentialsModel;