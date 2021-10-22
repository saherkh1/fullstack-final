const mongoose = require("mongoose");
const FamilyMemberSchema = mongoose.Schema({
    name: String,
    nickname: String,
    role: String,
    }, { versionKey: false});
const FamilyMemberModel = mongoose.model("FamilyMemberModel", FamilyMemberSchema, "familyMembers");
module.exports = FamilyMemberModel;
