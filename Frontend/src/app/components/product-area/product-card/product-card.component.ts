import { ProductsService } from 'src/app/services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    public imageAddress: string;
    public isAuthorized: boolean = false;
    searchText = '';
    text = `somedummy text here`;

    @Input()
    public product: ProductModel;
    constructor(private cartService: CartService, private notify: NotifyService, private productsService: ProductsService) {
        //this.isAuthorized = store.getState().authState.user?.role === "admin";
    }

    public async addToCart() {
        try {
            this.cartService.addCartProductAsync(this.product);
            this.notify.success("Product added to cart.");
        }
        catch (err) {
            this.notify.error(err);
        }
    }
    public async deleteProduct() {
        try {
            this.productsService.deleteProductAsync(this.product._id);
            this.notify.success("Product Deleted.");
        }
        catch (err) {
            this.notify.error(err);
        }
    }
    ngOnInit(): void {
        this.imageAddress = environment.productImagesUrl + this.product.image;
        this.isAuthorized = store.getState().authState.user?.role === "admin";
        console.log("run once");
    }
}
