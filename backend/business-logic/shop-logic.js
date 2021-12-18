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
    try { //workssssss should add latest lest return 
        let cart = await CartModel.findOne({ userId }).exec();
        if (cart === null) cart = createNewCart(userId);
        console.log("getCartAsync says that the cart is:", cart);
        return cart.save();
    } catch (error) {
        console.error("lol..... ", error);
    }
}

async function addToCartAsync(cartProduct) {
    try {
        console.log("Searching for this product", cartProduct);

        cartProduct = await cartProduct.populate("product");
        cartProduct.itemsPrice = cartProduct.quantity * cartProduct.product.price;
        const foundCartProduct = await CartProductModel.findByIdAndUpdate(cartProduct._id, cartProduct, { returnOriginal: false }).populate("product").exec();
        console.log("updated ", foundCartProduct);
        if (foundCartProduct) {
            console.log("it is not null! ", foundCartProduct);
            return foundCartProduct
        }

        console.log("updated price ", cartProduct);

        return cartProduct.save();
    } catch (error) {
        console.error(error);
    }
}
function deleteFromCartAsync(cartProductId) { //cartProductId = cartProduct._id
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
    // cart.userId = userId;
    // cart.createDate = new Date();
    console.log("createNewCart created a new cart:", cart);
    return cart;
}

//order
function createOrderAsync(order) {
    createNewCart(order.userId)
    const cartProducts = CartProductModel.find({ cartId: order.cartId }).populate("product").exec();
    order.orderDate = new Date();
    order.totalPrice = 0;
    cartProducts.forEach(P => {
        order.totalPrice += P.itemsPrice;
    });
    return order.save();
}

function getAllOrdersAsync() {
    return OrderModel.find().exec();
}

function getLatestOrderAsync(userId) {
    return OrderModel.findOne({ userId }).sort({ initDate: 'desc' }).populate("user cart").exec();
}

function addOrderAsync(order) {
    return order.save();
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
    addOrderAsync
}