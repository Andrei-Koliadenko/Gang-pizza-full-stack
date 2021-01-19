import FoodType from "./FoodType";

export default interface Food {
    id: number;
    name: string;
    description: string;
    isHot: boolean;
    picture: string;
    isVegan?: boolean;
    price: Map<string, number>;
    foodType: FoodType;
}