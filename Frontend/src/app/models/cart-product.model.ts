import { ProductModel } from "./product.model";

export class CartProductModel {
    public _id: string;
    public userId: string;
    public productId: string;
    public cartId: string;
    public product: ProductModel;
    public quantity: number;
    public itemsPrice: number;

}
