import Address from "./Address";
import PaymentType from "./PaymentType";
import orderContent from "./OrderContent";

export default interface Order {
    id: number;
    clientName: string;
    phoneNumber: string;
    orderCreationTime: string;
    orderDeliveryTime: string;
    clientAddress: Address;
    orderContent: orderContent[];//Map<[number, string],number>
    payment: PaymentType;
    extraInformation: string;
    isDelivered: boolean;
    clientEmail: string;
    totalPrice: number;
}