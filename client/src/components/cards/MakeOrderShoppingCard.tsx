import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {green} from '@material-ui/core/colors';
import ShoppingCardElement from "./ShoppingCardElement";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import Food from "../../models/food/Food";
import {serviceProductList} from "../../config/server-config";
import {Grid} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.info.main,
            width: 525
        },
        sectionDesktop: {
            display: 'none',
            '@media (min-width:1000px)': {
                display: 'flex',
            },
        },
        media: {

            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            // transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            // transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: green[500],
        },
    }),
);


const MakeOrderShoppingCard: React.FC = () => {
    const clientOrdersList: Map<string, number> = useSelector<ReducersType, Map<string, number>>(state => state.clientOrdersList)
    const productsList: Food[] = serviceProductList.getAllProducts();


    let numberOfClientOrders = 0;
    let sumGlobal = 0;
    Array.from(clientOrdersList.keys()).forEach(key => {
        let [id, size] = key.split(',');
        let productByID: Food = productsList.filter(value => value.id.toString() === id)[0];
        let DEFAULT_PRICE = productByID.price.get(size) as number;
        sumGlobal += DEFAULT_PRICE * (clientOrdersList.get(key) as number)
    });
    Array.from(clientOrdersList.values()).forEach(value => {
        numberOfClientOrders += value;
    })


    function getShoppingCardElement(orders: Map<string, number>) {
        return Array.from(orders.keys()).map(value => {
            const [productId, productSize] = value.split(",");
            const productByID: Food = productsList.filter(value => value.id.toString() === productId)[0]
            return <Grid container>
                <Grid item xs={4} container style={{alignItems: "center"}}>
                    <img src={productByID.picture} style={{height: 115, paddingLeft: 13}}/>
                </Grid>
                <Grid item xs={8} container justify="flex-end">
                    <ShoppingCardElement productNameSize={value}/>
                </Grid>

            </Grid>

        })
    }
    const classes = useStyles();

    return (
        <div className={classes.sectionDesktop}>
            <Card className={classes.root}>
                {getShoppingCardElement(clientOrdersList)}
            </Card>

        </div>
    );
}
export default MakeOrderShoppingCard;