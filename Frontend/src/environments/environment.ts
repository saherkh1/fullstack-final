const baseUrl = "http://localhost:3001/api/";

export const environment = {
    production: false,
    cityUrl: baseUrl + "city/",
    productCategoryUrl: baseUrl + "categories/",
    productsUrl: baseUrl + "products/",
    productImagesUrl: baseUrl + "images/",
    cartUrl: baseUrl + "cart/",
    cartProductsUrl: baseUrl + "cart/products/",
    cartTotalUrl: baseUrl + "cart/total/",
    order: baseUrl + "order/",
    registerUrl: baseUrl + "auth/register/",
    validationUrl: baseUrl + "auth/register/validation/",
    loginUrl: baseUrl + "auth/login"
}

export const ApplicationConstants = {
    superMarketName: "FindS",
    
}