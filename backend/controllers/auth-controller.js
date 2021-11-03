const express = require("express");
const authLogic = require("../business-logic/auth-logic");// business-logic/auth-logic");
const CredentialsModel = require("../models/credentials-model");
const UserModel = require("../models/user-model");

const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        const userCredentials = new UserModel(request.body);

        const loggedInUser = await authLogic.loginAsync(userCredentials);

        if (!loggedInUser) return response.status(404).send(`No matching username and password found`)
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);

        // check for duplicate
        const isDuplicate = await authLogic.isDuplicateUserAsync(request.body);
        if (isDuplicate?.length > 0) return response.status(400).send("User already exist");

        // Validate: 
        const errors = await user.validateSync(["email", "password", "idNumber"]);
        if (errors) return response.status(400).send(errors.message);

        const registeredUser = await authLogic.registerFirstStepAsync(user);
        console.log("errors : ", errors);
        response.status(201).json(registeredUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/register/validation", async (request, response) => {
    try {
        const user = new UserModel(request.body);

        // Validate: [firstName, lastName, street, city,]
        const errors = await user.validateSync(Object.keys(request.body));
        if (errors) return response.status(400).send(errors.message);

        const registeredUser = await authLogic.registerSecondStepAsync(request.body);
        response.status(201).json(registeredUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;