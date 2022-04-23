import { CityModel } from "./city.model";

export class UserModel {
    public _id: string;
    public cityId: CityModel;
    public firstName: string;
    public lastName: string;
    public email: string;
    public idNumber: string;
    public password: string;
    public street: string;
    public role: string;
    public verified: boolean;
    public token: string; // JWT: JSON Web Token - one string which the backend creates and sends us by which we can enter certain routes in the backend.
}
