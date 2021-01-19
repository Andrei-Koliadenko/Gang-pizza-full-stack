import Food from "../../models/food/Food";
import {Observable} from "rxjs";
import FoodServer from "../../models/food/FoodServer";

export default interface ProductListService {
    addProduct(product: FoodServer): Promise<any>;

    removeProduct(id: number): Promise<any>;

    updateProduct(id: number, updatedProduct: FoodServer): Promise<any>;

    getAllPizzas(): Food[];

    getAllDrinks(): Food[];

    getAllProducts(): Food[];

    getProductsObservable(): Observable<FoodServer[]>;

}