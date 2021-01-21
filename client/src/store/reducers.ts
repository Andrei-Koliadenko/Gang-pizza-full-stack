import {
    ActionType,
    DECREMENT,
    INCREMENT,
    SET_PRODUCT_LIST,
    SET_ORDER_LIST,
    SET_WINDOW_WIDTH,
    ADD_PRODUCT_TO_CLIENT_ORDERS_LIST,
    DELETE_PRODUCT_FROM_CLIENT_ORDERS_LIST,
    DELETE_ENTIRE_PRODUCT_FROM_CLIENT_ORDERS_LIST,
    SPINNER_STATE,
    SET_USER_DATA,
    SET_CLIENT_ORDERS_LIST,
} from "./actions";
import FoodServer from "../models/food/FoodServer";
import Order from "../models/orders/Order";
import {UserData} from "../services/auth/AuthService";

export const widthReducer = (width: number = window.innerWidth, action: ActionType): number =>
    action.type === SET_WINDOW_WIDTH ? action.payload : width;

export const productListReducer = (productList: FoodServer[] = [], action: ActionType): FoodServer[] =>
    action.type === SET_PRODUCT_LIST ? action.payload.slice(0) : productList;

export const orderListReducer = (orderList: Order[] = [], action: ActionType): Order[] =>
    action.type === SET_ORDER_LIST ? action.payload.slice(0) : orderList;

export const userDataReducer =
    (userData: UserData = {isAdmin: false, email: '', displayName: '', avatarURL: ''}, action: { type: string, payload: any }): UserData =>
        action.type === SET_USER_DATA ? {...action.payload as UserData} : userData;

export const shoppingCartCounterReducer = (counter: number = 0, action: ActionType): number => {
    switch (action.type) {
        case INCREMENT:
            return counter + +action.payload;
        case DECREMENT:
            return counter - +action.payload;
        default:
            return counter;
    }
}
export const clientOrdersListReducer = (clientOrdersList: Map<string, number> = new Map<string, number>(), action: ActionType): Map<string, number> => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CLIENT_ORDERS_LIST:
            if (clientOrdersList.has(action.payload)) {
                clientOrdersList.set(action.payload, (clientOrdersList.get(action.payload) as number) + 1)
            } else {
                clientOrdersList.set(action.payload, 1)
            }
            break;
        case DELETE_PRODUCT_FROM_CLIENT_ORDERS_LIST:
            const value: number = clientOrdersList.get(action.payload) as number;
            if (value > 1) {
                clientOrdersList.set(action.payload, value - 1)
            } else {
                clientOrdersList.delete(action.payload)
            }
            break;
        case DELETE_ENTIRE_PRODUCT_FROM_CLIENT_ORDERS_LIST:
            clientOrdersList.delete(action.payload)
            break;
        case SET_CLIENT_ORDERS_LIST:
            return new Map<string, number>(action.payload)
    }
    return new Map<string, number>(clientOrdersList);
}
export const spinnerReducer = (spinnerState: boolean = false, action: ActionType): boolean => {
    return action.type === SPINNER_STATE ? action.payload : spinnerState;
}

