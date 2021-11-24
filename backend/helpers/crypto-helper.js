const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function hash(plainText) {

    if (!plainText) return null;

    const salt = "ThisIsALotOfFun!";
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

function getNewToken(user) {
    const payload = { user };
    return jwt.sign(payload, global.config.jwtKey, { expiresIn: "30m" });
}

module.exports = {
    hash,
    getNewToken
};
