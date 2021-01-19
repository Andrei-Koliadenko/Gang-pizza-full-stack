import ProductListFirebaseService from "../services/product-list/ProductListFirebaseService";
import OrderListFirebaseService from "../services/order-list/OrderListFirebaseService";
import AuthServiceFirebase from "../services/auth/AuthServiceFirebase";
export const POLLING_INTERVAL: number = 4000;
export const PRODUCT_LIST_COLLECTION = 'product-list'
export const ORDER_LIST_COLLECTION = 'order-list'
export const ADMIN_COLLECTION = 'administrators'
export const serviceProductList = new ProductListFirebaseService(PRODUCT_LIST_COLLECTION);
export const serviceOrderList = new OrderListFirebaseService(ORDER_LIST_COLLECTION);
export const authService = new AuthServiceFirebase(ADMIN_COLLECTION);