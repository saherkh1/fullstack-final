import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryModel } from 'src/app/models/product-category.model';
import { ProductModel } from 'src/app/models/product.model';
import { categoryService } from 'src/app/services/category.service';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    private product = new ProductModel();
    public categories: ProductCategoryModel[];

    public nameControl = new FormControl(null, [Validators.required, Validators.pattern("^[A-Z].*$")]);
    public priceControl = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]);
    public categoryControl = new FormControl(null, Validators.required);
    public imageControl = new FormControl();

    public productForm = new FormGroup({
        nameControl: this.nameControl,
        priceControl: this.priceControl,
        categoryControl: this.categoryControl,
        imageControl: this.imageControl
    });
    constructor(private activatedRoute: ActivatedRoute, private categoryService: categoryService, private productsService: ProductsService, private router: Router, private notify: NotifyService) { }


    async ngOnInit() {
        try {
            this.categories = await this.categoryService.getAllCategoriesAsync();
            this.product._id = this.activatedRoute.snapshot.params.id;
            const product = await this.productsService.getOneProductAsync(this.product._id);
            this.nameControl.setValue(product.name);
            this.priceControl.setValue(product.price);
            this.categoryControl.setValue(product.productCategoryId);
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }
    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public setImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    public async update() {
        try {
            this.product.name = this.nameControl.value;
            this.product.price = this.priceControl.value;
            this.product.productCategoryId = this.categoryControl.value;

            await this.productsService.updateProductAsync(this.product);
            IncompleteGuard.canLeave = true;
            this.notify.success("Product updated");
            this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }
}
