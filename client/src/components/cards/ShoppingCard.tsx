import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {green} from '@material-ui/core/colors';
import ShoppingCardElement from "./ShoppingCardElement";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import {Link} from "react-router-dom";
import {PATH_MAKE_ORDER} from "../../config/links";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Food from "../../models/food/Food";
import {serviceProductList} from "../../config/server-config";
import {PopperPlacementType} from "@material-ui/core/Popper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 325,
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

type Props = {
    setOpen?: any
}
const ShoppingCard: React.FC<Props> = (props: Props) => {
    const clientOrdersList: Map<string, number> = useSelector<ReducersType, Map<string, number>>(state => state.clientOrdersList)
    // const [open, setOpen] = React.useState();
    const productsList: Food[] = serviceProductList.getAllProducts();

    let sumGlobal = 0;
    Array.from(clientOrdersList.keys()).forEach(key => {
        let [id, size] = key.split(',');
        let productByID: Food = productsList.filter(value => value.id.toString() === id)[0];
        let DEFAULT_PRICE = productByID.price.get(size) as number;
        sumGlobal += DEFAULT_PRICE * (clientOrdersList.get(key) as number)
    });

    function getShoppingCardElement(orders: Map<string, number>) {
        return Array.from(orders.keys()).map(value => {
            return <ShoppingCardElement productNameSize={value}/>
        })
    }

    function handleClickRout() {
        props.setOpen(false);
        return window.location.href = '#' + PATH_MAKE_ORDER
    }

    const classes = useStyles();

    return (
        <div style={{padding: 15}}>
            <Card className={classes.root}>
                {getShoppingCardElement(clientOrdersList)}
                <Button style={{width: 325}} variant="contained" color="primary"
                        disabled={clientOrdersList.size === 0} onClick={handleClickRout}>
                    <Typography variant={"body1"} style={{}}>
                        Order: {sumGlobal}₪
                    </Typography>
                </Button>
            </Card>

        </div>
    );
}
export default ShoppingCard;