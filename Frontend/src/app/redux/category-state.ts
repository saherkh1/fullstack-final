import { ProductCategoryModel } from "../models/product-category.model";

// Category App State: 
export class CategoryState {
    public categories: ProductCategoryModel[] = [];
}

// Category Action Type: 
export enum CategoryActionType {
    CategoryDownloaded = "CategoryDownloaded",
}

// Category Action: 
export interface CategoryAction {
    type: CategoryActionType; // Which action are we doing.
    payload: any;             // Which data are we sending to the AppState.
}

// Category Reducer (the new CategoryState() is for the first time only - we create a new AppState):
export function categoryReducer(currentState: CategoryState = new CategoryState(), action: CategoryAction): CategoryState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator

    // Perform the action: 
    switch (action.type) {
        case CategoryActionType.CategoryDownloaded:
            newState.categories = action.payload; // Here action.payload MUST be the downloaded Category array!
            break;
        
    }

    // Return the new state: 
    return newState;
}
