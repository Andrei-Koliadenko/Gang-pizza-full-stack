import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import FoodCard from "../cards/Card";
import {serviceProductList} from "../../config/server-config";


const Drink: React.FC = () => {
    const drinkList = serviceProductList.getAllDrinks();
    function getDrinksItems(): any[] {
        return drinkList.map(item => {
            return <div>
                <FoodCard {...item}/>
            </div>
        })
    }
    return <Fragment>
            <Grid container spacing={0} className={'base-background'} justify={'center'} >
                <Grid item xs={12} container justify="center" >
                    {getDrinksItems()}
                </Grid>
            </Grid>
    </Fragment>
}
export default Drink;