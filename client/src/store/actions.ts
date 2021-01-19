import FoodServer from "../models/food/FoodServer";
import Order from "../models/orders/Order";
import {UserData} from "../services/auth/AuthService";
export const SET_PRODUCT_LIST = 'set-product-list';
export const SET_ORDER_LIST = 'set-order-list';
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
export const SET_USER_DATA = 'set-user-data';
export const SET_WINDOW_WIDTH = 'set-window-width';
export const ADD_PRODUCT_TO_CLIENT_ORDERS_LIST = 'add-product';
export const DELETE_PRODUCT_FROM_CLIENT_ORDERS_LIST = 'delete-product';
export const DELETE_ENTIRE_PRODUCT_FROM_CLIENT_ORDERS_LIST = 'delete-entire-product';
export const SPINNER_STATE = 'spinner-state';
export const SET_CLIENT_ORDERS_LIST = 'set-client-orders-list';
export type ActionType = {
    type: string;
    payload: any
}

export const productListAction = (payload: FoodServer[]): ActionType => {
    return {type: SET_PRODUCT_LIST, payload}
}

export const orderListAction = (payload: Order[]): ActionType => {
    return {type: SET_ORDER_LIST, payload}
}

export const userDataAction = (userData: UserData): {type: string, payload: any} =>
    ({type: SET_USER_DATA, payload: userData})

export const shoppingCartCounterIncrementAction = (payload: number): ActionType => {
    return {type: INCREMENT, payload}
}

export const shoppingCartCounterDecrementAction = (payload: number): ActionType => {
    return {type: DECREMENT, payload}
}

export const widthAction = (width: number): ActionType =>
    ({type: SET_WINDOW_WIDTH, payload: width})

export const addProductToClientOrdersList = (payload: string): ActionType => {
    return {type: ADD_PRODUCT_TO_CLIENT_ORDERS_LIST, payload}
}
export const deleteProductFromClientOrdersList = (payload: string): ActionType => {
    return {type: DELETE_PRODUCT_FROM_CLIENT_ORDERS_LIST, payload}
}
export const deleteEntireProductFromClientOrdersList = (payload: string): ActionType => {
    return {type: DELETE_ENTIRE_PRODUCT_FROM_CLIENT_ORDERS_LIST, payload}
}
export const setClientOrdersList = (payload: Map<string,number>): ActionType => {
    return {type: SET_CLIENT_ORDERS_LIST, payload}
}
export const spinnerState = (payload: boolean): ActionType => {
    return {type: SPINNER_STATE, payload}
}