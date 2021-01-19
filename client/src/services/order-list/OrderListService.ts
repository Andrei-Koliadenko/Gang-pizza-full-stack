import Order from "../../models/orders/Order";

export default interface OrderListService {
    addOrder(order: Order): boolean;

    removeOrder(id: number): boolean;

    updateOrder(id: number, updatedOrder: Order): boolean;

    getOrders(): Order[];
}