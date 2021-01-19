import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PizzaSize from "../../models/food/PizzaSize";
import Food from "../../models/food/Food";
import FoodType from "../../models/food/FoodType";
import DrinkSize from "../../models/food/DrinkSize";
import {Grid} from "@material-ui/core";
type Props = {
    product: Food
}
export default function ProductSizeSelector(props: Props) {
    const  productSize1 = props.product.foodType === FoodType.Pizza ? PizzaSize.small : DrinkSize.thirdLiter
    const  productSize2 = props.product.foodType === FoodType.Pizza ? PizzaSize.medium : DrinkSize.halfLiter
    const  productSize3 = props.product.foodType === FoodType.Pizza ? PizzaSize.large : DrinkSize.liter
    return (
        <FormControl component="fieldset">
            {/*<FormLabel component="legend">Size:</FormLabel>*/}
            <Grid container justify="center" style={{width: 325}} >
                {/*325 - ширина карты*/}
                <Grid item xs={12} container>
                    <RadioGroup row aria-label="position" name="position" defaultValue={productSize1}>
                        <FormControlLabel value={productSize1} control={<Radio color="primary"/>} label={productSize1}/>
                        <FormControlLabel value={productSize2} control={<Radio color="primary"/>} label={productSize2}/>
                        <FormControlLabel value={productSize3} control={<Radio color="primary"/>} label={productSize3}/>
                    </RadioGroup>
                </Grid>

            </Grid>
        </FormControl>
    );
}