const errorsHelper = require("../helpers/errors-helper");
const locations = require("../helpers/locations");
const uuid = require("uuid");
const deleteOldImage = require("../helpers/image-helper");

async function handleImage(request, response, next) {
    try {
        const currentMethod = request.method;
        const isPost = (currentMethod === "POST");
        if (!request.files) { //no files attached
            isPost ? errorsHelper.badRequestError(response, "No image sent") : next();
            return;
        }
        if (!request.files.image) { //no image attached
            isPost ? errorsHelper.badRequestError(response, "The image must be called image") : next();
            return;
        }
        // currentMethod === "PUT" && deleteOldImage(await logic.deleteVacationAsync(vacationId));
        if (request.files?.image) {//there is an image attached
            const image = request.files.image; // The name of the image sent from the front.
            const extension = image.name.substr(image.name.lastIndexOf(".")); // ".jpg" or ".png" or ".gif" or...
            const newFileName = uuid.v4() + extension; // "d3388752-7a4f-44d5-992c-bc316c750f7f.jpg"
            image.mv(locations.getProductImageFile(newFileName)); // Move the file into the hard-disk
            request.body.image = newFileName;
        }
        next();
    } catch (err) {
        errorsHelper.internalServerError(response, err);
    }
}

module.exports = handleImage;