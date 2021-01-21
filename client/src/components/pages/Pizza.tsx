import React, {Fragment} from "react";
import FoodCard from "../cards/Card";
import {Grid} from "@material-ui/core";
import {serviceProductList} from "../../config/server-config";
import Food from "../../models/food/Food";

const Pizza: React.FC = () => {
    const pizzaList: Food[] = serviceProductList.getAllPizzas();
    function getPizzaItems(): any[] {
        return pizzaList.map(item => {
            return <div>
                <FoodCard {...item}/>
            </div>
        })
    }
    return <Fragment>
        <Grid container spacing={0} className={'base-background'}>
            <Grid item xs={12} container justify="center">
                {getPizzaItems()}
            </Grid>
        </Grid>
    </Fragment>
}
export default Pizza;