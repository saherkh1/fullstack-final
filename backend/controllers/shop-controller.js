const express = require("express");
const shopLogic = require("../business-logic/shop-logic");// business-logic/auth-logic");
const CredentialsModel = require("../models/credentials-model");
const ProductModel = require("../models/product-model");
const UserModel = require("../models/user-model");
const errorsHelper = require("../helpers/errors-helper");
const locations = require("../helpers/locations");
const handleImage = require("../middleware/image-handler");
const { imageExist } = require("../helpers/image-helper");

const router = express.Router();
//get all products
router.get("/products", async (request, response) => {
    try {
        const products = await shopLogic.getAllProductsAsync();
        // console.log(products);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//add product
router.post("/products", handleImage, async (request, response) => {
    try {

        const product = new ProductModel(request.body);
        const returnedProduct = await shopLogic.addProductAsync(product);
        // console.log(returnedProduct.category)
        response.json(returnedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//Update a Product
router.put("/products/:productId", handleImage, async (request, response) => {
    try {
        // Model:
        const productId = request.params.productId;
        request.body._id = productId;
        const product = new ProductModel(request.body);

        // Validate:
        // const errors = product.validatePut();
        // if (errors) return errorsHelper.badRequestError(response, err);

        // Logic:
        const updatedProduct = await shopLogic.updateProductAsync(product);
        if (!updatedProduct) return response.status(404).send(`id: ${productId} ,not found`);

        // Success:
        response.json(updatedProduct);
    }
    catch (err) {
        errorsHelper.internalServerError(response, err);
    }
});
// get All Categories
router.get("/categories", async (request, response) => {
    try {

        const categories = await shopLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//Get an image 
router.get("/images/:imageName", async (request, response) => {
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
//Get Cart
router.get("/cart", async (request, response) => {
    try {
        const cart = await shopLogic.getCartAsync();
        response.json(cart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;