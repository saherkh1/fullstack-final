function internalServerError(response, err) {

    if (global.config.isDevelopment !== null) {
        console.log(err);
        response.status(500).send(err);
        return;
    }
    response.status(500).send("Some error, please try again.");
}

function badRequestError(response, err) {

    if (global.config.isDevelopment !== null) {
        console.log(err);
        response.status(400).send(err);
        return;
    }
    return response.status(400).send("Bad Request, try deferent values.");
}

function notFoundError(response, err) {

    if (global.config.isDevelopment !== null) {
        console.log(err);
        response.status(404).send(err);
        return;
    }
    return response.status(404).send("Error, page not found or file not found");
}
module.exports = {
    internalServerError,
    badRequestError,
    notFoundError

};