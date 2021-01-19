import React from "react";
import {createStyles, Grid, Theme} from "@material-ui/core";
import OrderForm from "../forms/OrderForm";
import MakeOrderShoppingCard from "../cards/MakeOrderShoppingCard";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: {
            backgroundColor: theme.palette.secondary.main

        },

    }),
);
const MakeOrder: React.FC = () => {
    const classes = useStyles();
    return <Grid container spacing={0} className={'base-background'}>
        <Grid item xs={7} container justify="center">
            <OrderForm/>
        </Grid>
        <Grid style={{maxHeight: '55vh', overflowY: "auto"}} item xs={5} >
            <MakeOrderShoppingCard/>
        </Grid>

    </Grid>
}
export default MakeOrder;