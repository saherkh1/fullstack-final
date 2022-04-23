import { ProductCategoryModel } from "./product-category.model";

export class ProductModel {
    public _id: string;
    public productCategoryId: string;
    public name: string;
    public price: number;
    public category: ProductCategoryModel;
    public imageName: string;
    public image: FileList;
}
