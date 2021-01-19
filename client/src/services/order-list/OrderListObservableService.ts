import Order from "../../models/orders/Order";
import {Observable} from "rxjs";

export default interface OrderListObservableService {
    addOrder(order: Order): Promise<any>;

    removeOrder(id: number): Promise<any>;

    updateOrder(id: number, updatedOrder: Order): Promise<any>;

    getOrders(): Observable<Order[]>;
}