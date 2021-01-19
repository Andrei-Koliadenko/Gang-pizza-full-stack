import React from "react";
import {CarouselLoop} from "../page elements/Carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
    }),
);
const Promotions: React.FC = () => {
    const classes = useStyles();
    return <React.Fragment>
        <Grid className={classes.sectionDesktop} container spacing={0} justify="center">
            <Grid item xs={8} container justify="center" >
                <div>
                    <Box boxShadow={15}>
                    <CarouselLoop/>
                    </Box>
                </div>
            </Grid>
        </Grid>
        <Grid className={classes.sectionMobile} container spacing={0} justify="center">
            <Grid item xs={12} container justify="center">
                <div>
                    <CarouselLoop/>
                </div>
            </Grid>
        </Grid>
        {/*<br/>*/}
        {/*<button onClick={() => {*/}
        {/*    const address: Address = {*/}
        {/*        street: "street",*/}
        {/*        house: 0,*/}
        {/*        apartment: -1*/}
        {/*    }*/}
        {/*    let jsonObject = {};*/}

        {/*    const map = new Map<[number, string],number>([*/}
        {/*        [[101, PizzaSize.large], 1],*/}
        {/*        [[103, PizzaSize.small], 2],*/}
        {/*        [[19000, DrinkSize.liter], 5]*/}
        {/*    ])*/}
        {/*    map.forEach((value, key) => {*/}
        {/*        // @ts-ignore*/}
        {/*        jsonObject[key] = value;*/}
        {/*    });*/}
        {/*    const str: string = JSON.stringify(jsonObject);*/}
        {/*    console.log(str);*/}
        {/*    const orderDemo: Order = {*/}
        {/*        id: getRandomNumber(1, 10000),*/}
        {/*        clientName: "Korol@sosiska.il",*/}
        {/*        clientAddress: address,*/}
        {/*        orderContent: str,*/}
        {/*           // [serviceProductList.getAllProducts()[getRandomNumber(0, 2)],*/}
        {/*           // serviceProductList.getAllProducts()[getRandomNumber(0, 2)]],*/}
        {/*        orderCreationTime: Date.now().toLocaleString(),*/}
        {/*        orderDeliveryTime: Date.now().toLocaleString(),*/}
        {/*        payment: PaymentType.cash,*/}
        {/*        extraInformation: "I am Korol",*/}
        {/*        isDelivered: false,*/}
        {/*        phoneNumber: "45644333"*/}
        {/*    }*/}
        {/*    serviceOrderList.addOrder(orderDemo);*/}
        {/*    dispatch(shoppingCartCounterIncrementAction(1));*/}
        {/*}}>Add item to shopping cart*/}
        {/*</button>*/}
        {/*<button onClick={() => {*/}
        {/*    if (shoppingCartCounter >= 1) {*/}
        {/*        dispatch(shoppingCartCounterDecrementAction(1));*/}
        {/*    }*/}
        {/*}}>Remove item from shopping cart*/}
        {/*</button>*/}
        {/*<br/><br/>*/}
    </React.Fragment>
}
export default Promotions;