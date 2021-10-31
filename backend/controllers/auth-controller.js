const express = require("express");
const authLogic = require("../business-logic/auth-logic");// business-logic/auth-logic");
const CredentialsModel = require("../models/credentials-model");
const UserModel = require("../models/user-model");

const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        const userCredentials = new CredentialsModel(request.body);
        console.log("this is the user", userCredentials)
        const loggedInUser = await authLogic.loginAsync(userCredentials);
        if (!loggedInUser) response.status(404).send(`No matching username and password found`)
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        console.log("auth controller: /register : got this user", user);

        // if (await authLogic.isDuplicateUserAsync(user.username))
        //     return response.status(400).send(`Username "${user.username}" already taken.`);

        const registeredUser = await authLogic.registerFirstStepAsync(user);
        response.status(201).json(registeredUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/register/verification", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        console.log("auth controller: /register/second : got this user", user);
        const registeredUser = await authLogic.registerSecondStepAsync(user);
        response.status(201).json(registeredUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// router.post("/api/task", async (request, response) => {
//     try {
//         const task = new TaskModel(request.body);
//         const addedTask = await logic.addTaskAsync(task);
//         response.status(201).json(addedTask);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// router.delete("/api/task/:_id", async (request, response) => {
//     try {
//         const _id = request.params._id;
//         await logic.deleteTask(_id);
//         response.sendStatus(204);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

module.exports = router;