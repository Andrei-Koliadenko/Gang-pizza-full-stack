import React, {FC, useRef, useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {green} from '@material-ui/core/colors';
import ProductSizeSelector from "./ProductSizeSelector";
import {Button, Grid} from "@material-ui/core";
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import KeyboardArrowUpSharpIcon from '@material-ui/icons/KeyboardArrowUpSharp';
import {addProductToClientOrdersList} from "../../store/actions";
import {useDispatch} from "react-redux";
import EcoIcon from '@material-ui/icons/Eco';
import Food from "../../models/food/Food";
import PizzaSize from "../../models/food/PizzaSize";
import FoodType from "../../models/food/FoodType";
import DrinkSize from "../../models/food/DrinkSize";
import SnackBarMessage from "../page elements/SnackBarMessage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 325,
            backgroundColor: "#FFFEF7",
            padding: '10'
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


const FoodCard: FC<Food> = (product: Food) => {
    const DEFAULT_PRICE = product.price.get(product.foodType === FoodType.Pizza ? PizzaSize.small : DrinkSize.thirdLiter) as number;
    const [productPrice, setProductPrice] = useState<number>(DEFAULT_PRICE)
    const sizePicked = useRef<string>(Array.from(product.price.keys())[0]);
    const [openSnackBarMessage, setOpenSnackBarMessage] = useState<boolean>(false);
    const handleCloseSnackBarMessage = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarMessage(false);
    };


    const dispatch = useDispatch();

    function onChangeRadioBottomValue(event: any) {
        const price = product.price.get(event.target.value) as number;
        setProductPrice(price);
        sizePicked.current = event.target.value;
    }

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        setProductPrice(DEFAULT_PRICE)

    };

    return (
        <div style={{padding: 15}}>
            <Card className={classes.root}>
                <CardHeader
                    // avatar={
                    //     <Avatar aria-label="recipe" className={classes.avatar}>
                    //         R
                    //     </Avatar>
                    // }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         {product.isVegan && <EcoIcon style={{color: "green"}}/>}
                    //     </IconButton>
                    // }

                    title={
                        <Grid container spacing={0} justify={"center"}>
                            <Grid item xs={11} container justify="flex-start">
                                <Typography variant={'h5'} style={{height: 50}}>
                                    {product.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} container justify="flex-end" >
                                {product.isVegan && <EcoIcon style={{color: "green"}}/>}
                            </Grid>
                        </Grid>

                    }
                    // subheader={product.description}
                />
                <CardMedia
                    className={classes.media}
                    image={product.picture}
                    title={product.name}
                />
                <CardContent style={{height: 125}}>
                    <Typography variant="body2" color="textSecondary" component={'span'}>
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Typography variant={'h5'} style={{marginLeft: '5%'}}>
                        {productPrice}₪
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        {!expanded && <AddShoppingCartSharpIcon fontSize={"large"}/>}
                        {expanded && <KeyboardArrowUpSharpIcon fontSize={"large"}/>}

                    </IconButton>


                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography component={'span'}>Size:</Typography>
                        <Typography component={'span'} onChange={onChangeRadioBottomValue}>
                            <ProductSizeSelector product={product}/>
                        </Typography>
                        <Grid container spacing={0} justify={"center"}>
                            <Grid item xs={12} container justify="center">
                                <Button style={{flex: 1, alignSelf: 'stretch'}} variant="contained" color={"primary"}
                                        size={"large"} onClick={() => {
                                    dispatch(addProductToClientOrdersList([product.id, sizePicked.current].join()));
                                    setOpenSnackBarMessage(true);
                                }}>
                                    <Typography component={'span'}
                                                style={{flex: 1, alignSelf: 'flex-start'}}>Add <AddShoppingCartSharpIcon
                                        style={{color: '#FFF'}} fontSize={"small"}/></Typography>
                                    <Typography component={'span'}
                                                style={{flex: 1, alignSelf: 'flex-end'}}>Price:{productPrice}</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
            <SnackBarMessage autoHide={1000} handleCloseSnackBarMessage={handleCloseSnackBarMessage} openSnackBar={openSnackBarMessage} severity={"success"} message={"Product added to shopping cart"}/>
        </div>
    );
}
export default FoodCard;