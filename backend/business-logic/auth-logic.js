const UserModel = require("../models/user-model");
const cryptoHelper = require("../helpers/crypto-helper");

function isDuplicateUserAsync(user) {
    let tempUser = { ...user }
    delete tempUser.passowrd
    console.log("temprory user  is :  ", ...tempUser);
    return UserModel.find(...tempUser).exec();
}

async function registerFirstStepAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    const isDuplicate = await isDuplicateUserAsync(user);
    console.log("First Register: ")
    if (isDuplicate) {
        console.log("duplicate: ", isDuplicate);
        throw new Error("User already exist");
    }
    // console.log("auth-logic: isDuplicateUserAsync says: ", response);
    user.verified = false;
    user.role = "Client";
    const newUser = user.save();
    newUser.token = cryptoHelper.getNewToken(newUser);
    console.log("user saved: ", newUser);
    return newUser;
}

function registerSecondStepAsync(user) {
    user.verified = true;
    return user.update();
}

  function loginAsync(credentials) {
    try {// credentials.password = cryptoHelper.hash(credentials.password);
        const email = credentials.email;
        const password = credentials.password
        return  UserModel.findOne({ email, password }).exec();
        delete loggedInUser.password;
        console.log("the user ", loggedInUser)
        return loggedInUser;
    }
    catch (err) {
        console.error(err);
    }
}
module.exports = {
    loginAsync,
    isDuplicateUserAsync,
    registerFirstStepAsync,
    registerSecondStepAsync
}