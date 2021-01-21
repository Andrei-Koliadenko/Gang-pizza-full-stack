import {Observable} from "rxjs";
import LoginCodes from "../../util/LoginCodes";

export interface LoginData {
    email: string,
    password: string
}
export interface UserData {
    email: string;
    displayName: string;
    isAdmin: boolean;
    avatarURL: string;
}
export default interface AuthService {
    login(loginData: LoginData): Promise<LoginCodes>;
    logout():Promise<boolean>;
    getUserData(): Observable<UserData>;
}