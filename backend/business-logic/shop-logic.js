const CityModel = require("../models/city-model");
const CartModel = require("../models/cart-model");
const ProductModel = require("../models/product-model");
const CartProductModel = require("../models/cart-product-model");
const ProductCategoryModel = require("../models/Product-category-model");
const ImageHelper = require("../helpers/image-helper");

//product
function getAllProductsAsync() {
    return ProductModel.find().populate("category").exec();
}

async function addProductAsync(product) {
    return product.save();
}
function deleteProductAsync(ProductId) {
    return ProductModel.findByIdAndDelete(ProductId);
}
async function updateProductAsync(newProduct) {
    const products = await getAllProductsAsync();
    const oldProduct = products.find(p => p._id.equals(newProduct._id));
    if (!oldProduct) return null;
    if (newProduct.image)
        if (oldProduct.image !== newProduct.image)
            ImageHelper.deleteOldImage(oldProduct.image);
    return ProductModel.findByIdAndUpdate(newProduct._id, newProduct, { returnOriginal: false }).exec();
    // return ProductModel.findOneAndUpdate(newProduct._id, newProduct, { returnOriginal: false }).exec();
}

//cart
async function getCartAsync(userId) {
    let cart = await CartModel.findOne({ userId }, {}, { sort: { createDate: -1 } });
    if (cart === null) cart = createNewCart(userId);
    else return cart;
    return cart.save();
}

async function addToCartAsync(cartProduct) {

    cartProduct = await cartProduct.populate("product");
    cartProduct.itemsPrice = cartProduct.quantity * cartProduct.product.price;
    const foundCartProduct = await CartProductModel.findByIdAndUpdate(cartProduct._id, cartProduct, { returnOriginal: false }).populate("product").exec();
    if (foundCartProduct) {
        return foundCartProduct
    }
    return cartProduct.save();
}
function deleteFromCartAsync(cartProductId) {
    return CartProductModel.findByIdAndDelete(cartProductId);
}
// get all products that have been added to this cart
function GetAllCartProductsAsync(cartId) {
    return CartProductModel.find({ cartId }).populate("product").exec();
}
function updateCartProductAsync(cartProduct) {
    return CartProductModel.findByIdAndUpdate(cartProduct._id, cartProduct, { returnOriginal: false }).exec();
}

function createNewCart(userId) {
    const date = new Date();
    cart = new CartModel({ userId: userId, createDate: date });
    return cart.save();
}

//order
function createOrderAsync(order) {
    createNewCart(order.userId)
    order.orderDate = new Date();
    return order.save();


}

function getAllOrdersAsync() {
    return OrderModel.find({ userId }).sort({ initDate: 'desc' }).populate("cart").populate("city").exec();
}

function getLatestOrderAsync(userId) {
    return OrderModel.findOne({ userId }).sort({ initDate: 'desc' }).populate("cart").populate("city").exec();
}


//Categories
function getAllCategoriesAsync() {
    return ProductCategoryModel.find().exec();
}
// city 
function getAllCitesAsync() {
    return CityModel.find().exec();
}
module.exports = {
    getAllProductsAsync,
    addProductAsync,
    deleteProductAsync,
    updateProductAsync,
    getCartAsync,
    addToCartAsync,
    deleteFromCartAsync,
    GetAllCartProductsAsync,
    createOrderAsync,
    getAllCitesAsync,
    getAllCategoriesAsync,
    getLatestOrderAsync,
    getAllOrdersAsync,
}