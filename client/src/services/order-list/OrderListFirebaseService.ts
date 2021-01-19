import firebase from "firebase";
import appFirebase from "../../config/firebase-sdk";
import {collectionData} from "rxfire/firestore";
import Food from "../../models/food/Food";
import {Observable} from "rxjs";
import ErrorTypes from "../../util/ErrorTypes";

import {reviver} from "../../util/mapFunctions";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import OrderListObservableService from "./OrderListObservableService";
import Order from "../../models/orders/Order";
import FoodServer from "../../models/food/FoodServer";

export default class OrderListFirebaseService implements OrderListObservableService {
    db: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

    constructor(collection: string) {
        this.db = appFirebase.firestore().collection(collection);
    }

    exists(id: number): Promise<boolean> {
        return this.db.doc(id.toString()).get().then(doc => doc.exists);
    }

    async addOrder(order: Order): Promise<any> {
        if (await this.exists(order.id)) {
            throw ErrorTypes.SERVER_ERROR
        }
        return this.db.doc(order.id.toString()).set(order)
    }

    async removeOrder(id: number): Promise<any> {
        if (await this.exists(id)) {
            return this.db.doc(id.toString()).delete();
        } else {
            throw ErrorTypes.SERVER_ERROR;
        }
    }

    async updateOrder(id: number, updatedOrder: Order): Promise<any> {
        if (await this.exists(id)) {
            return this.db.doc(id.toString()).set(updatedOrder);
        } else {
            throw ErrorTypes.SERVER_ERROR;
        }
    }

    getOrders(): Observable<Order[]> {
        return collectionData<Order>(this.db);
    }
}