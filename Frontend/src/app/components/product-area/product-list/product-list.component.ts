import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public products: ProductModel[];
    public isAuthorized: boolean = false;
    constructor(private productsService: ProductsService, private notify: NotifyService) { }

    async ngOnInit() {
        try {
            this.isAuthorized = store.getState().authState.user?.role === "admin";
            this.products = await this.productsService.getAllProductsAsync();
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

}
