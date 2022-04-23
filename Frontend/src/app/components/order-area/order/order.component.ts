import { FormControl } from '@angular/forms';
import { IncompleteGuard } from './../../../services/incomplete.guard';
import { CityModel } from './../../../models/city.model';
import { OrderModel } from './../../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './../../../services/order.service';
import { CartService } from './../../../services/cart.service';
import { CartProductModel } from './../../../models/cart-product.model';
import { CartModel } from './../../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public cart: CartModel = null;
    public cartProducts: CartProductModel[] = [];
    public totalPrice: number = 0;
    public order = new OrderModel;
    public today = new Date().toISOString().split('T')[0];
    public cities: CityModel[];

    constructor(private cartService: CartService, private orderService: OrderService, private router: Router, private http: HttpClient, private notify: NotifyService) { }

    async ngOnInit() {
        this.cities = await this.http.get<CityModel[]>(environment.cityUrl).toPromise();
        const userId = store.getState().authState.user._id;
        this.cart = await this.cartService.getCartAsync(userId);
        this.cartProducts = await this.cartService.getCartProductsAsync(this.cart._id);
        this.totalPrice = this.cartProducts.reduce((sum, c) => sum + (c.product.price * c.quantity), 0)

    }
    placeOrder = async () => {
        try {
            //create service that creates order
            // await this.orderService.createOrder(this.order);
            this.order.cartId = this.cart._id;
            // this.order.user = store.getState().authState.user;
            this.order.userId = store.getState().authState.user._id;
            this.order.totalPrice = this.totalPrice;
            if (this.order.totalPrice === 0) throw "Cant place an empty order"
            let date = this.order.shippingDate;
            if (!moment().isSameOrBefore(date, 'day')) {
                throw "Shipping date must be in the future"
            }
            //close cart:done in the backend
            const createdOrder = await this.orderService.createOrderAsync(this.order);
            //await this.cartService.getCartAsync(this.order.userId);
            //create order
            IncompleteGuard.canLeave = true;
            window.confirm("Order Placed.\nThank you for ordering");
            this.notify.success("Order created");
            this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }

    }
    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }


}

