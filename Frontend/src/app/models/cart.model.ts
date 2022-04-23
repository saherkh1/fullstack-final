import { CartProductModel } from "./cart-product.model";
import { UserModel } from "./user.model";

export class CartModel {
    public _id: string;
    public userId: UserModel;
    public cartProducts: [CartProductModel];
    public createDate: Date;
}
