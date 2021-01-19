import {Observable} from "rxjs";
import LoginCodes from "../../util/LoginCodes";

export interface LoginData {
    email: string,
    password: string
}
export interface UserData {
    user: string;
    isAdmin: boolean;
}
export default interface AuthService {
    login(loginData: LoginData): Promise<LoginCodes>;
    logout():Promise<boolean>;
    getUserData(): Observable<UserData>;
}