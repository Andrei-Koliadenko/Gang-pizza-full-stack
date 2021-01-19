import Order from "../../models/orders/Order";
import OrderListService from "./OrderListService";

export default class OrderListServiceMapImpl implements OrderListService {
    private orderList: Map<number, Order>

    constructor() {
        this.orderList = new Map<number, Order>();
    }

    addOrder(order: Order): boolean {
        if (this.orderList.get(order.id)) {
            return false;
        }
        this.orderList.set(order.id, order);
        return true;
    }

    getOrders(): Order[] {
        const allOrders: Order[] = [];
        this.orderList.forEach((order) => {
            allOrders.push(order)
        })
        return allOrders;
    }

    removeOrder(id: number): boolean {
        if (this.orderList.get(id)) {
            this.orderList.delete(id);
            return true;
        }
        return false;
    }

    updateOrder(id: number, updatedOrder: Order): boolean {
        const order: Order | undefined = this.orderList.get(id);
        if (order) {
            order.orderDeliveryTime = updatedOrder.orderDeliveryTime
            order.clientAddress = updatedOrder.clientAddress
            order.orderContent = updatedOrder.orderContent
            order.payment = updatedOrder.payment
            order.extraInformation = updatedOrder.extraInformation
            return true;
        }
        return false;
    }
}