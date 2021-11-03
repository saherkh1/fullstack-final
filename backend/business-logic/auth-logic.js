const UserModel = require("../models/user-model");
const cryptoHelper = require("../helpers/crypto-helper");

function isDuplicateUserAsync(user) {
    let tempUser = user
    delete tempUser.password
    return UserModel.find({ ...tempUser }).exec();
}

async function registerFirstStepAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    user.verified = false;
    user.role = "Client";
    user.token = cryptoHelper.getNewToken(user);
    const newUser = await UserModel.collection.insertOne({
        email: user.email,
        password: user.password,
        idNumber: user.idNumber
    });
    return UserModel.findById(newUser.insertedId).exec();
}

async function registerSecondStepAsync(user) {
    user.verified = true;
    // console.log(user.id)
    const id = user._id;
    return UserModel.findByIdAndUpdate(id, user, { returnOriginal: false }).exec().catch(reason => console.log(reason));
}

function loginAsync(credentials) {
        const email = credentials.email;
        const password = credentials.password
        return UserModel.findOne({ email, password }).exec();
}
module.exports = {
    loginAsync,
    isDuplicateUserAsync,
    registerFirstStepAsync,
    registerSecondStepAsync
}