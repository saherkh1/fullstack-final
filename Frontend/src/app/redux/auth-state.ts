import { UserModel } from "../models/user.model";


// Auth State: 
export class AuthState {
    public user: UserModel = null;
    public constructor() {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) {
            this.user = user;
        }
    }
}

// Auth Action Types: 
// export enum AuthActionType {
enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // Here payload is optional because we have no data on UserLoggedOut.
}
// Auth Action Creators:
export function userRegisteredAction(registeredUser: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: registeredUser };
}
export function userLoggedInAction(loggedInUser: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: loggedInUser };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}
// Auth Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch(action.type) {
        case AuthActionType.UserRegistered: 
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload; // Here action.payload is a UserModel object sent from backend.
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.UserLoggedOut:
            newState.user = null; // Here we don't have action.payload.
            localStorage.removeItem("user");
            break;
    }
    return newState;
}

