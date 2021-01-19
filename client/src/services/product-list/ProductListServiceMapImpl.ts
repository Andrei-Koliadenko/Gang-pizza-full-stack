import Food from "../../models/food/Food";
import ProductListService from "./ProductListService";
import FoodType from "../../models/food/FoodType";

export default class ProductListServiceMapImpl implements ProductListService {
    private productList: Map<number, Food>

    constructor() {
        this.productList = new Map<number, Food>();
    }

    addProduct(product: Food): boolean {
        if (this.productList.get(product.id)) {
            return false;
        }
        this.productList.set(product.id, product);
        return true;
    }

    removeProduct(id: number): boolean {
        if (this.productList.get(id)) {
            this.productList.delete(id);
            return true;
        }
        return false;
    }

    getAllPizzas(): Food[] {
        const allPizzas: Food[] = [];
        this.productList.forEach((product) => {
            if (product.foodType === FoodType.Pizza) {
                allPizzas.push(product)
            }

        })
        return allPizzas;
    }

    getAllDrinks(): Food[] {
        const allDrinks: Food[] = [];
        this.productList.forEach((product) => {
            if (product.foodType === FoodType.Drink) {
                allDrinks.push(product)
            }

        })
        return allDrinks;
    }

    getAllProducts(): Food[] {
        const allProducts: Food[] = [];
        this.productList.forEach((product) => {
            allProducts.push(product)
        })
        return allProducts;
    }

    updateProduct(id: number, updatedProduct: Food): boolean {
        const product: Food | undefined = this.productList.get(id);
        if (product) {
            product.name = updatedProduct.name;
            product.description = updatedProduct.description;
            product.isHot = updatedProduct.isHot;
            product.picture = updatedProduct.picture;
            if (product.isVegan !== undefined) {
                product.isVegan = updatedProduct.isVegan;
            }
            product.price = updatedProduct.price;
            return true;
        }
        return false;
    }
    getProduct(id: number): Food | undefined {
        return this.productList.get(id);
    }
}