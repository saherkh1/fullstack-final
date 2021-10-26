const mongoose = require("mongoose");

const CredentialsSchema = mongoose.Schema({
    email: String,
    Password: String,
},
    { versionKey: false });
const CredentialsModel = mongoose.model("CredentialsModel", CredentialsSchema, "Users");

module.exports = CredentialsModel;