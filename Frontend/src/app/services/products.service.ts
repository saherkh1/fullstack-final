import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategoryModel } from '../models/product-category.model';
import { ProductModel } from '../models/product.model';
import { ProductsActionType } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public async getAllProductsAsync(): Promise<ProductModel[]> {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch({ type: ProductsActionType.ProductsDownloaded, payload: products });
        }
        return store.getState().productsState.products;
    }

    public async getOneProductAsync(id: String): Promise<ProductModel> {
        const products = await this.getAllProductsAsync();
        return products.find(p => p._id === id);
    }

    public async addProductAsync(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("productCategoryId", product.productCategoryId.toString());
        formData.append("image", product.image.item(0));
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, formData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductAdded, payload: addedProduct });
        return addedProduct;
    }

    public async updateProductAsync(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("productCategoryId", product.productCategoryId.toString());
        if (product.image) formData.append("image", product.image.item(0));
        const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product._id, formData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductUpdated, payload: updatedProduct });
        return updatedProduct;
    }

    public async deleteProductAsync(id: String): Promise<ProductModel[]> {
        //TODO: add the API
        const formData = new FormData();
        const updatedProduct = await this.http.delete<ProductModel>(environment.productsUrl + id).toPromise();
        store.dispatch({ type: ProductsActionType.ProductDeleted, payload: id });
        return store.getState().productsState.products;
    }

}
