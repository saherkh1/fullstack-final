const mongoose = require("mongoose");

mongoose.connect(config.mongodb.connectionString)
    .then(db => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
