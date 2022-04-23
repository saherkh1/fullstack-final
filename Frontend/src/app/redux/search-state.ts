// Products App State: 
export class SearchState {
    public searchText: string = "";
}

// Products Action Type: 
export enum SearchActionType {
    SearchTextCreated = "SearchTextCreated"
}

// Products Action: 
export interface SearchAction {
    type: SearchActionType; // Which action are we doing.
    payload: any;             // Which data are we sending to the AppState.
}

// Products Reducer (the new ProductsState() is for the first time only - we create a new AppState):
export function SearchReducer(currentState: SearchState = new SearchState(), action: SearchAction): SearchState {

    // Create a copy of the currentState:
    const newState = { ...currentState }; // ... is JS Spread Operator

    // Perform the action: 
    switch (action.type) {
        case SearchActionType.SearchTextCreated:
            newState.searchText = action.payload; // Here action.payload MUST be the downloaded products array!
            break;
    }

    // Return the new state: 
    return newState;
}
