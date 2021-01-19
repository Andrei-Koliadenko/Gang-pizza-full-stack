import firebase from "firebase";
import appFirebase from "../../config/firebase-sdk";
import ProductListObservableService from "./ProductListObservableService";
import {collectionData} from "rxfire/firestore";
import Food from "../../models/food/Food";
import {Observable} from "rxjs";
import ErrorTypes from "../../util/ErrorTypes";
import FoodType from "../../models/food/FoodType";
import FoodServer from "../../models/food/FoodServer";
import {reviver} from "../../util/mapFunctions";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";

export default class ProductListFirebaseService implements ProductListObservableService {
    db: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

    constructor(collection: string) {
        this.db = appFirebase.firestore().collection(collection);
    }

    exists(id: number): Promise<boolean> {
        return this.db.doc(id.toString()).get().then(doc => doc.exists);
    }

    async addProduct(product: FoodServer): Promise<any> {
        if (await this.exists(product.id)) {
            throw ErrorTypes.SERVER_ERROR
        }
        return this.db.doc(product.id.toString()).set(product)
    }

    async removeProduct(id: number): Promise<any> {
        if (await this.exists(id)) {
            return this.db.doc(id.toString()).delete();
        } else {
            throw ErrorTypes.SERVER_ERROR;
        }
    }

    async updateProduct(id: number, updatedProduct: FoodServer): Promise<any> {
        if (await this.exists(id)) {
            return this.db.doc(id.toString()).set(updatedProduct)
        } else {
            throw ErrorTypes.SERVER_ERROR;
        }
    }

    getProductsObservable(): Observable<FoodServer[]> {
        return collectionData<FoodServer>(this.db);
    }

    getAllProducts(): Food[] {
        const productList: FoodServer[] = useSelector((state: ReducersType) => state.productList);
        const products: Food[] = [];
        productList.forEach(product => {
            const vegan: boolean | undefined = typeof product.isVegan === "string" ? undefined : product.isVegan
            const food: Food = {
                id: product.id,
                name: product.name,
                description: product.description,
                picture: product.picture,
                foodType: product.foodType as FoodType,
                isVegan: vegan,
                isHot: product.hot,
                price: JSON.parse(product.price, reviver),
            }
            products.push(food);
        })
        return products;
    }

    getAllPizzas(): Food[] {
        const productList: FoodServer[] = useSelector((state: ReducersType) => state.productList);
        const pizzas: Food[] = [];
        productList.forEach(product => {
            if (product.foodType === FoodType.Pizza) {
                const pizza: Food = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    picture: product.picture,
                    foodType: FoodType.Pizza,
                    isVegan: product.isVegan as boolean,
                    isHot: product.hot,
                    price: JSON.parse(product.price, reviver),
                }
                pizzas.push(pizza);
            }
        })
        return pizzas;
    }

    getAllDrinks(): Food[] {
        const productList: FoodServer[] = useSelector((state: ReducersType) => state.productList);
        const drinks: Food[] = [];
        productList.forEach(product => {
            if (product.foodType === FoodType.Drink) {
                const drink: Food = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    picture: product.picture,
                    foodType: FoodType.Drink,
                    isVegan: undefined,
                    isHot: product.hot,
                    price: JSON.parse(product.price, reviver),
                }
                drinks.push(drink);
            }
        })
        return drinks;
    }

}
