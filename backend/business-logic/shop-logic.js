const dal = require("../data-access-layer/dal");
const CartModel = require("../models/cart-model");
const ProductModel = require("../models/product-model");
const CartProductModel = require("../models/cart-product-model");
const ProductCategoryModel = require("../models/Product-category-model");
const ImageHelper = require("../helpers/image-helper");
const { Mongoose } = require("mongoose");

//product
function getAllProductsAsync() {
    return ProductModel.find().populate("category").exec();
}

async function addProductAsync(product) {
    return product.save();
}

async function updateProductAsync(newProduct) {
    const products = await getAllProductsAsync();
    const oldProduct = products.find(p => p._id.equals(newProduct._id));
    if (!oldProduct) return null;
    if (newProduct.image)
        if (oldProduct.image !== newProduct.image)
            ImageHelper.deleteOldImage(oldProduct.image);
    return ProductModel.findByIdAndUpdate(newProduct._id, newProduct, { returnOriginal: false }).exec();
}

//cart
async function getCartAsync(userId) {
    let cart = await CartModel.findOne({ userId: userId }, { sort: { 'createDate': -1 } });
    console.log("getCartAsync says that the found cart is:", cart);
    if (cart === null) createNewCart(userId);
    return cart;
}
function addToCartAsync(cartProduct) {
    return cartProduct.save();
}
function deleteFromCartAsync(cartProductId) { //cartProductId = cartProduct._id
    return CartProductModel.findByIdAndDelete(cartProductId).exec();
}
function updateCartProductAsync(cartProduct) {
    return CartProductModel.findByIdAndUpdate(cartProduct._id, cartProduct, { returnOriginal: false }).exec();
}
//order
function createOrderAsync(order) {
    // createNewCart(order.userId)
}
function createNewCart(userId) {
    cart = new CartModel();
    cart.userId = userId;
    cart.createDate = new Date();
    console.log("createNewCart created a new cart:", cart);
    return cart;
}
function getAllCategoriesAsync() {
    return ProductCategoryModel.find().exec();
}
module.exports = {
    getAllProductsAsync,
    addProductAsync,
    updateProductAsync,
    getCartAsync,
    addToCartAsync,
    deleteFromCartAsync,
    updateCartProductAsync,
    createOrderAsync,
    getAllCategoriesAsync
}