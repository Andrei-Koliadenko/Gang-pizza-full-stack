import React from "react";
import {Grid} from "@material-ui/core";
import OrderForm from "../forms/OrderForm";
import MakeOrderShoppingCard from "../cards/MakeOrderShoppingCard";

const MakeOrder: React.FC = () => {

    return <Grid container spacing={0} className={'base-background'}>
        <Grid item xs={7} container justify="center">
            <OrderForm/>
        </Grid>
        <Grid style={{maxHeight: '55vh', overflowY: "auto"}} item xs={5}>
            <MakeOrderShoppingCard/>
        </Grid>

    </Grid>
}
export default MakeOrder;