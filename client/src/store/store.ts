import {combineReducers, createStore} from "redux";
import {
    productListReducer,
    orderListReducer,
    shoppingCartCounterReducer,
    widthReducer,
    clientOrdersListReducer,
    spinnerReducer, userDataReducer,

} from "./reducers";
import FoodServer from "../models/food/FoodServer";
import Order from "../models/orders/Order";
import {UserData} from "../services/auth/AuthService";

export type ReducersType = {
    productList: FoodServer[],
    orderList: Order[],
    shoppingCartCounter: number,
    width: number,
    userData: UserData,
    clientOrdersList: Map<string,number>,
    spinnerState: boolean
}
const allReducers = combineReducers<ReducersType>({
    productList: productListReducer,
    orderList: orderListReducer,
    shoppingCartCounter: shoppingCartCounterReducer,
    width: widthReducer,
    userData: userDataReducer,
    clientOrdersList: clientOrdersListReducer,
    spinnerState: spinnerReducer
})
export const store = createStore(allReducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());
