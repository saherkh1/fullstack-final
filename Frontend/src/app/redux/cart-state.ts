import { CartProductModel } from "../models/cart-product.model";
import { CartModel } from "../models/cart.model";

// Cart App State: 
export class CartState {
    public cart: CartModel = null;
    public cartProducts: CartProductModel[] = [];
    public totalPrice: number = null;
}

// Cart Action Type: 
export enum CartActionType {
    CartDownloaded = "CartDownloaded",
    CartProductsDownloaded = "CartProductsDownloaded",
    CartProductAdded = "CartProductAdded",
    CartProductUpdated = "CartProductUpdated",
    CartProductDeleted = "CartProductDeleted",
    TotalPriceCalculated = "TotalPriceCalculated",
    OrderCreated = "OrderCreated"
}

// Cart Action: 
export interface CartAction {
    type: CartActionType; // Which action are we doing.
    payload: any;             // Which data are we sending to the AppState.
}

// Cart Reducer (the new CartState() is for the first time only - we create a new AppState):
export function cartReducer(
    currentState: CartState = new CartState(),
    action: CartAction): CartState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator

    // Perform the action: 
    switch (action.type) {
        case CartActionType.CartDownloaded:
            newState.cart = action.payload; // Here action.payload MUST be the downloaded Cart!
            break;
        case CartActionType.CartProductsDownloaded:
            newState.cartProducts = action.payload; // Here action.payload MUST be the downloaded Cart Products array!
            break;
        case CartActionType.CartProductAdded:
            newState.cartProducts.push(action.payload); // Here action.payload MUST be the added Cart Product!
            break;

        case CartActionType.CartProductUpdated:
            // Here action.payload MUST be the Cart Product to update!
            const indexToUpdate = newState.cartProducts.findIndex(p => p._id === action.payload._id);
            newState.cartProducts[indexToUpdate] = action.payload;
            break;
        case CartActionType.CartProductDeleted:
            // Here action.payload MUST be the id to delete!
            const indexToDelete = newState.cartProducts.findIndex(p => p._id === action.payload);
            newState.cartProducts.splice(indexToDelete, 1);
            break;
        case CartActionType.OrderCreated:
            // Here action.payload MUST be the id of the cart to buy!

            // const indexToDelete = newState.Cart.findIndex(p => p._id === action.payload); 
            // newState.cart.splice(indexToDelete, 1);
            break;
        case CartActionType.TotalPriceCalculated:
            // Here action.payload MUST be the totalPrice Object!
            newState.totalPrice = action.payload;
            break;
    }

    // Return the new state: 
    return newState;
}
