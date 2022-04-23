import { CartProductModel } from '../models/cart-product.model';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';
import { CartActionType } from '../redux/cart-state';
import { CartState } from './../redux/cart-state';
import { HttpClient } from '@angular/common/http';
import { CartModel } from '../models/cart.model';
import { Injectable } from '@angular/core';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private _cart: CartModel;
    private _products: CartProductModel[];

    constructor(private http: HttpClient) { }


    public async getCartAsync(userId: String): Promise<CartModel> {
        const cart = await this.http.get<CartModel[]>(environment.cartUrl + userId).toPromise();
        store.dispatch({ type: CartActionType.CartDownloaded, payload: cart });
        return store.getState().cartState.cart;
    }

    public async getCartProductsAsync(cartId: String): Promise<CartProductModel[]> {
        if (store.getState().cartState.cartProducts.length === 0) {
            const cartProducts = await this.http.get<CartProductModel[]>(environment.cartProductsUrl + cartId).toPromise();// /api/cart/:id
            store.dispatch({ type: CartActionType.CartProductsDownloaded, payload: cartProducts });
        }
        return store.getState().cartState.cartProducts;
    }
    
    public async addCartProductAsync(product: ProductModel,): Promise<CartProductModel[]> {
        const cartProducts = store.getState().cartState.cartProducts;
        let cartProduct = cartProducts.find(p => p.productId === product._id);
        //true: create new product
        const isNewProduct = (!cartProduct);
        if (isNewProduct) {//create new cartProduct 
            cartProduct = new CartProductModel();
            cartProduct.quantity = 1;
            cartProduct.cartId = store.getState().cartState.cart._id;
            cartProduct.productId = product._id;
            cartProduct.itemsPrice = product.price;
        } else {
            cartProduct.quantity += 1;
            cartProduct.itemsPrice = cartProduct.quantity * product.price;
        }


        const newCartProduct = await this.http.put<CartModel[]>(environment.cartUrl, cartProduct).toPromise();
        (isNewProduct)
            ? store.dispatch({ type: CartActionType.CartProductAdded, payload: newCartProduct })
            : store.dispatch({ type: CartActionType.CartProductUpdated, payload: newCartProduct });

        return store.getState().cartState.cartProducts;
    }
    
    public async updateCartProductAsync(cartProduct: CartProductModel): Promise<CartProductModel[]> {
        cartProduct.itemsPrice = cartProduct.quantity * cartProduct.product.price;
        const newCartProduct = await this.http.put<CartModel[]>(environment.cartUrl, cartProduct).toPromise();
        store.dispatch({ type: CartActionType.CartProductUpdated, payload: newCartProduct });
        return store.getState().cartState.cartProducts;
    }
    //send the id of the cartProduct
    public async deleteCartProductAsync(id: String): Promise<CartProductModel[]> {
        await this.http.delete<CartModel[]>(environment.cartUrl + id).toPromise();
        store.dispatch({ type: CartActionType.CartProductDeleted, payload: id });
        return store.getState().cartState.cartProducts;
    }

    public async getTotalPriceAsync(id: String): Promise<number> {
        if (store.getState().cartState.totalPrice === null) {
            const totalPrice = await this.http.get<number>(environment.cartTotalUrl).toPromise();
            store.dispatch({ type: CartActionType.TotalPriceCalculated, payload: totalPrice })
        }
        const total = store.getState().cartState.totalPrice;
        return total ? total : 0;
    }

    public cleanCartStore() {
        store.dispatch({ type: CartActionType.CartDownloaded, payload: new CartState() })
    }
}
