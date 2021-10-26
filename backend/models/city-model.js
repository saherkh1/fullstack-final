const mongoose = require("mongoose");
const CitySchema = mongoose.Schema({
    city: String,
    }, { versionKey: false});
const CityModel = mongoose.model("CityModel", CitySchema, "City");
module.exports = CityModel;
