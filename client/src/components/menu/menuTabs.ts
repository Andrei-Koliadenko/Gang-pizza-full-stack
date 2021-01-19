import {
    PATH_PRODUCTS,
    PATH_DRINK,
    PATH_HOME,
    PATH_ORDERS,
    PATH_PIZZA,
    PATH_STATISTIC
} from "../../config/links";
import {FC} from "react";
import {PromotionsIcon, PizzaIcon, DrinkIcon, OrdersIcon, ProductsIcon, StatisticIcon} from "./MenuIcons";

type MenuTabs = {
    path: string;
    label: string;
    icon: FC;
    isAdmin?: boolean;
}

export const menuProps: MenuTabs[] = [
    {path: PATH_HOME, label: 'Promotion', icon: PromotionsIcon},
    {path: PATH_PIZZA, label: 'Pizza', icon: PizzaIcon},
    {path: PATH_DRINK, label: 'Drinks', icon: DrinkIcon},
    {path: PATH_ORDERS, label: 'Orders', icon: OrdersIcon, isAdmin: true},
    {path: PATH_PRODUCTS, label: 'Products', icon: ProductsIcon, isAdmin: true},
    {path: PATH_STATISTIC, label: 'Statistic', icon: StatisticIcon, isAdmin: true}
]