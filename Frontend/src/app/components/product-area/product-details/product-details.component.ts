import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


    public imageAddress: string;
    public product: ProductModel;
    public isAuthorized: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private notify: NotifyService) { } // DI

    async ngOnInit() {
        try {
            this.isAuthorized = store.getState().authState.user?.role === "admin";
            const id = this.activatedRoute.snapshot.params.id;
            this.product = await this.productsService.getOneProductAsync(id);
            this.imageAddress = environment.productImagesUrl + this.product.image;
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }
}
