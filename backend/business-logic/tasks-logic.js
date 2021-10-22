const dal = require("../data-access-layer/dal");
const FamilyMemberModel = require("../models/family-member-model");
const TaskModel = require("../models/task-model");

function getAllFamilyMembersAsync() {
    return FamilyMemberModel.find().exec();
}

function getAllTasksAsync() {
    return TaskModel.find().populate("familyMember").exec();
}

function addTaskAsync(task) {
    task.dateAdded = new Date();
    return task.save();
}

function deleteTask(_id){
    return TaskModel.findByIdAndDelete(_id).exec();
}

module.exports = {
    getAllFamilyMembersAsync,
    getAllTasksAsync,
    addTaskAsync,
    deleteTask
};