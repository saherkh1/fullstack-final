import { CartModel } from "./cart.model";
import { CityModel } from "./city.model";
import { UserModel } from "./user.model";

export class OrderModel {
    public _id: string;
    public cartId: string;
    public userId: string;
    public cityId: string;
    public city: CityModel;
    public totalPrice: Number;
    public street: String;
    public shippingDate: Date;
    public orderDate: Date;
    public cardNumber: Number;
}
