const jwt = require("jsonwebtoken");

function verifyLoggedIn(request, response, next) {
    if (!request.headers.authorization) return response.status(401).send("You are not logged-in.");
    const token = request.headers.authorization.split(" ")[1];
    if (!token) return response.status(401).send("You are not logged-in.");
    jwt.verify(token, config.jwtKey, err => {
        if (err) {
            if (err.message === "jwt expired") return response.status(403).send("Your login session has expired.");
            return response.status(401).send("You are not logged-in.");
        }
        console.log("",)
        next();
    });
}
function verifyAdmin(request, response, next) {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) return response.status(401).send("You are not logged-in.");
    if(jwt.decode(token).user.role === "admin") next();
}

module.exports = {
    verifyAdmin,
    verifyLoggedIn
};
