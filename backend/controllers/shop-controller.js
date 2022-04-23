const express = require("express");
const shopLogic = require("../business-logic/shop-logic");// business-logic/auth-logic");
const ProductModel = require("../models/product-model");
const errorsHelper = require("../helpers/errors-helper");
const locations = require("../helpers/locations");
const handleImage = require("../middleware/image-handler");
const CartProductModel = require("../models/cart-product-model");
const OrderModel = require("../models/order-model");

const router = express.Router();
//get all products
router.get("/products", async (request, response) => {
    try {
        const products = await shopLogic.getAllProductsAsync();
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
        response.json(returnedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
router.delete("/products/:ProductId", async (request, response) => {
    try {
        const ProductId = request.params.ProductId;
        await shopLogic.deleteProductAsync(ProductId);
        response.status(204).send();
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


router.get("/cart/products/:cartId", async (request, response) => {
    try {
        const cartId = request.params.cartId;
        const cartProducts = await shopLogic.GetAllCartProductsAsync(cartId);
        response.json(cartProducts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//Get Cart
router.get("/cart/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const cart = await shopLogic.getCartAsync(userId);
        response.json(cart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// add product to cart
router.put("/cart", async (request, response) => {
    try {
        const cartProduct = new CartProductModel(request.body);
        const responseProduct = await shopLogic.addToCartAsync(cartProduct);
        response.json(responseProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/cart/:cartProductId", async (request, response) => {
    try {
        const cartProductId = request.params.cartProductId;
        await shopLogic.deleteFromCartAsync(cartProductId);
        response.status(204).send();
    }
    catch (err) {
        response.status(500).send(err.message);
    }

});
router.get("/order/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;

        const orders = await shopLogic.getAllOrdersAsync(userId);
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/order/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const latestOrder = await shopLogic.getLatestOrderAsync(_id);
        response.json(latestOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.post("/order/", async (request, response) => {
    try {
        const order = new OrderModel(request.body);

        // Validate: 
        // const errors = await order.validateSync();
        // if (errors) return response.status(400).send(errors.message);

        const addedOrder = await shopLogic.createOrderAsync(order);
        response.status(201).json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//get all cites
router.get("/city", async (request, response) => {
    try {
        const cites = await shopLogic.getAllCitesAsync();
        response.json(cites);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;