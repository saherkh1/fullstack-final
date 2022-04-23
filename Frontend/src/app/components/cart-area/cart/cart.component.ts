import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartModel } from 'src/app/models/cart.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy, OnInit {

    public cart: CartModel = null;
    public cartProducts: CartProductModel[] = [];
    public totalPrice: number = 0;
    public timerKiller: any;

    constructor(private cartService: CartService) { }

    addHandler = (id: string) => this.subtractHelper(false, id);
    subHandler = (id: string) => this.subtractHelper(true, id);
    deleteHandler = async (id: string) => {
        const productDeleted = this.cartProducts.find(p => p._id === id);
        this.cartProducts = await this.cartService.deleteCartProductAsync(productDeleted._id);
    }
    subtractHelper = async (isSubtract: boolean, id: string) => {
        this.timerKiller = setTimeout(async () => {
            const updatedProduct = this.cartProducts.find(p => p._id === id);
            isSubtract ? updatedProduct.quantity-- : updatedProduct.quantity++;
            this.cartProducts = await this.cartService.updateCartProductAsync(updatedProduct);
            let updateTotal = 0;
            this.cartProducts.map(p => updateTotal += p.product.price * p.quantity);
            this.totalPrice = updateTotal;
        }, 500)
    }
    async ngOnInit() {
        // get the id from the store!!
        this.totalPrice = 0;
        const userId = store.getState().authState.user._id;
        this.cart = await this.cartService.getCartAsync(userId);
        this.cartProducts = await this.cartService.getCartProductsAsync(this.cart._id);
        this.totalPrice = this.cartProducts.reduce((sum, c) => sum + (c.product.price * c.quantity), 0)
        store.subscribe(() => {
            this.cart = store.getState().cartState.cart;
            this.cartProducts = store.getState().cartState.cartProducts;
            this.totalPrice = this.cartProducts.reduce((sum, c) => sum + (c.product.price * c.quantity), 0)
        })
    }
    ngOnDestroy(): void {
        clearTimeout(this.timerKiller);
    }



}
