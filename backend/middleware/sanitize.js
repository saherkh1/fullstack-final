const stripTags = require("striptags"); // npm i striptags

function sanitize(request, response, next) {
    for(const prop in request.body) {
        if(typeof request.body[prop] === "string") {
            request.body[prop] = stripTags(request.body[prop]); // "<h1>Hi</h1>" --> "Hi"
        }
    }
    next();
}

module.exports = sanitize;