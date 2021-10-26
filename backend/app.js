global.config = global.process.env.NODE_ENV === "production" ? require("./config-prod.json") : require("./config-dev.json");
const express = require("express");
const cors = require("cors");
const sanitize = require("./middleware/sanitize")
const expressFileUpload = require("express-fileupload");
const expressRateLimit = require("express-rate-limit");
const expressSession = require("express-session");
const authController = require("./controllers/auth-controller");
const shopController = require("./controllers/shop-controller");
const server = express();

server.use(sanitize);

// server.use("/api/", expressRateLimit({
//     windowMs: 1000, // time window
//     max: 10000, // max requests allowed in that time window from the same user
//     message: "Are you a hacker?" // Error message.
// }));

// server.use(expressSession({
//     name: "captchaCookie", // Cookie name
//     secret: "KittensAreCute", // Encryption key of the session id
//     resave: true, // Start counting session time from each request
//     saveUninitialized: false // ???
// }));

server.use(express.json());
server.use(expressFileUpload()); // Insert the uploaded file into request.files object
server.use(cors());

//server.use("/api/auth", authController);
server.use("/api", shopController);
server.use("*", (request, response) => {
    console.log(request.baseUrl);
    response.status(404).send("Route Not Found")
});

server.listen(3001, () => console.log("Listening..."));

