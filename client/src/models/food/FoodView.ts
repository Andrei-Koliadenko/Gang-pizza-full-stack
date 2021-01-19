import {ReactElement} from "react";
import FoodType from "./FoodType";
import Food from "./Food";

type FoodView = {
    id: number;
    name: string;
    description: string;
    hot: ReactElement;
    picture: ReactElement;
    isVegan?: ReactElement|string;
    price: string;
    foodType: FoodType;
    food: Food;
}
export default FoodView