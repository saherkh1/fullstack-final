const fs = require('fs');
const locations = require("./locations");

function deleteOldImage(oldImageName) {
    fs.unlinkSync(locations.getProductImageFile(oldImageName));
}
function imageExist(path) {
    return fs.existsSync(path);
}
module.exports = { deleteOldImage, imageExist }