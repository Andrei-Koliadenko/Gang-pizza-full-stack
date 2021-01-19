import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Popper, {PopperPlacementType} from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import {ShoppingCart} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import ShoppingCard from "./ShoppingCard";
import Food from "../../models/food/Food";
import {serviceProductList} from "../../config/server-config";
import {Link} from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import {PATH_MAKE_ORDER} from "../../config/links";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        sectionDesktop: {
            display: 'none',
            '@media (min-width:500px)': {
                display: 'flex',
            },
        },
        typography: {
            padding: theme.spacing(2),
        },
    }),
);

export default function PopperShoppingCard() {
    const clientOrdersList: Map<string, number> = useSelector<ReducersType, Map<string, number>>(state => state.clientOrdersList)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();
    const classes = useStyles();
    const productsList: Food[] = serviceProductList.getAllProducts();

    let numberOfClientOrders = 0;
    let sumGlobal = 0;
    Array.from(clientOrdersList.keys()).forEach(key => {
        let [id, size] = key.split(',');
        let productByID: Food = productsList.filter(value => value.id.toString() == id)[0];
        let DEFAULT_PRICE = productByID.price.get(size) as number;
        sumGlobal += DEFAULT_PRICE * (clientOrdersList.get(key) as number)
    });
    Array.from(clientOrdersList.values()).forEach(value => {
        numberOfClientOrders += value;
    })

    const handleClick = (newPlacement: PopperPlacementType) => (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
        setPlacement(newPlacement);

    };
    if (open && clientOrdersList.size === 0) {
        setOpen(false)
    }

    function handleClickRout() {
        setOpen(false);
        return window.location.href='#'+PATH_MAKE_ORDER
    }

    return (
        <div className={classes.root}>
            <Popper color={"inherit"} open={open} anchorEl={anchorEl} placement={placement} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={150}>
                        <div style={{maxHeight: "70vh", overflowY: "auto"}}>
                            <ShoppingCard setOpen={setOpen}/>
                        </div>
                    </Fade>
                )}
            </Popper>
            <Grid container spacing={0} justify="center" style={{flex: 1}}>
                <Grid className={classes.sectionDesktop} item xs={8} container justify="flex-start">

                    <Button style={{width: 150}} variant="contained" color="primary"
                            disabled={clientOrdersList.size === 0} onClick={handleClickRout}>
                        <Typography variant={"body1"} style={{}}>
                            Order: {sumGlobal}₪
                        </Typography>
                    </Button>

                </Grid>
                <Grid item xs={4} container justify="flex-end">
                    <Button disabled={clientOrdersList.size === 0} onClick={handleClick('bottom-end')}>
                        <Badge color="primary" badgeContent={numberOfClientOrders}>
                            <ShoppingCart  fontSize={"large"} style={{color: "black"}}/>
                        </Badge>
                    </Button>
                </Grid>
            </Grid>


        </div>
    );
}
