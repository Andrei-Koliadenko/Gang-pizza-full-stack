import Food from "../../models/food/Food";

export default interface ProductListService {
    addProduct(product: Food): boolean;

    removeProduct(id: number): boolean;

    updateProduct(id: number, updatedProduct: Food): boolean;

    getAllPizzas(): Food[];

    getAllDrinks(): Food[];

    getAllProducts(): Food[];

    getProduct(id: number): Food | undefined;
}