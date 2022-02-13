const express = require("express");
const errorsHelper = require("../helpers/errors-helper");
const locations = require("../helpers/locations");
const { imageExist } = require("../helpers/image-helper");

const router = express.Router();

//Get an image 
router.get("/:imageName", (request, response) => {
    try {
        const imageName = request.params.imageName;
        if (imageName === null || imageName === "undefined")
            errorsHelper.notFoundError(response, "No Image named: " + imageName);
        else {
            const imageToSend = locations.getProductImageFile(imageName);
            if (!imageExist(imageToSend))
                errorsHelper.notFoundError(response, "No such image");
            else
                response.sendFile(imageToSend);

        }
    }
    catch (err) {
        errorsHelper.internalServerError(response, err);
    }
});
module.exports = router;