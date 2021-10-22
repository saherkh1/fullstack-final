const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    familyMemberId: mongoose.Schema.Types.ObjectId,
    taskDescription: String,
    dateAdded: Date,
},
    { versionKey: false, 
        toJSON: { virtuals: true }, id: false }); 
TaskSchema.virtual("familyMember", { //add another field with this name
    ref: "FamilyMemberModel", // Foreign collection model
    localField: "familyMemberId", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "author" field as a single object rather than array.
});

const TaskModel = mongoose.model("TaskModel", TaskSchema, "tasks"); 

module.exports = TaskModel;