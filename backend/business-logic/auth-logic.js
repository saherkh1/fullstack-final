const dal = require("../data-access-layer/dal");
const UserModel = require("../models/user-model");

function isDuplicateUserAsync(user) {
    let tempUser = { ...user }
    delete tempUser.passowrd
    console.log("temprory user  is :  ", ...tempUser);
    return UserModel.find(...tempUser).exec();
}

async function registerFirstStepAsync(user) {
    const duplicate = await isDuplicateUserAsync(user);
    console.log("First Register: ")
    if (duplicate) {
        console.log("duplicate: ", duplicate)
        throw new Error("User alredy exist");
    }
    // console.log("auth-logic: isDuplicateUserAsync says: ", response);
    user.verified = false;
    user.role = "Client";
    // console.log("user to be saved: ", user);
    return user.save();
}

function registerSecondStepAsync(user) {
    user.verified = true;
    return user.update();
}

function loginAsync(credentials) {
    return UserModel.find(credentials).exec();
}
module.exports = {
    loginAsync,
    isDuplicateUserAsync,
    registerFirstStepAsync,
    registerSecondStepAsync
}