import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartReducer } from "./cart-state";
import { categoryReducer } from "./category-state";
import { productsReducer } from "./products-state";
import { SearchReducer } from "./search-state";

// Create an object containing all the reducers: 
const reducers = combineReducers({
    productsState: productsReducer,
    categoryState: categoryReducer,
    cartState: cartReducer,
    authState: authReducer,
    searchState: SearchReducer
});

// Crete the store object:
const store = createStore(reducers);

// Export the store:
export default store;
