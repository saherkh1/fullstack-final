const express = require("express");
const logic = require("../business-logic/tasks-logic");
const TaskModel = require("../models/task-model");

const router = express.Router();

router.get("/api/family-members", async (request, response) => {
    try {
        const familyMembers = await logic.getAllFamilyMembersAsync()
        response.json(familyMembers);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/api/task", async (request, response) => {
    try {
        const tasks = await logic.getAllTasksAsync();
        response.json(tasks);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/api/task", async (request, response) => {
    try {
        const task = new TaskModel(request.body);
        const addedTask = await logic.addTaskAsync(task);
        response.status(201).json(addedTask);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/api/task/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await logic.deleteTask(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;