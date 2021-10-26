const path = require("path");

const rootFolder = path.resolve(__dirname, "..");
const productImagesFolder = path.join(rootFolder, "images");
const notFoundImageFile = path.join(rootFolder, "images", "not-found.jpg");

function getProductImageFile(imageName) {
    if (!imageName) return null;
    return path.join(productImagesFolder, imageName);
}

module.exports = {
    getProductImageFile,
    notFoundImageFile
};