import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {green} from '@material-ui/core/colors';
import CounterButton from "./CounterButton";
import {Box, Card, Divider, Grid, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import ClearIcon from '@material-ui/icons/Clear';
import CardHeader from "@material-ui/core/CardHeader";
import {deleteEntireProductFromClientOrdersList} from "../../store/actions";
import Food from "../../models/food/Food";
import {serviceProductList} from "../../config/server-config";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 325,
            backgroundColor: theme.palette.secondary.main,
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
    productNameSize: string
}

const ShoppingCardElement: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    let [productId, productSize] = props.productNameSize.split(',');
    const dispatch = useDispatch()
    const clientOrdersList: Map<string, number> = useSelector<ReducersType, Map<string, number>>(state => state.clientOrdersList)
    const numberOfProduct: number = clientOrdersList.get(props.productNameSize) as number

    const productsList: Food[] = serviceProductList.getAllProducts();
    const productByID: Food = productsList.filter(value => value.id.toString() === productId)[0]

    const DEFAULT_PRICE = productByID.price.get(productSize) as number;

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant={'h5'}>
                        <Grid container spacing={0} justify="center">
                            <Grid item xs={10} style={{display: "flex",flexDirection: "column", justifyContent: "center"}}>
                                {productByID.name}
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={event => dispatch(deleteEntireProductFromClientOrdersList(props.productNameSize))}>
                                    <ClearIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Typography>
                    {/*<Typography variant="caption" color="textSecondary" component={'span'}>*/}
                    {/*    {productByID.description}{"\n"}*/}
                    {/*</Typography>*/}
                    <Typography variant={'subtitle2'}>
                        Size: {productSize}
                    </Typography>
                    {/*<Typography variant={'body2'}>{DEFAULT_PRICE}₪ × {numberOfProduct}:</Typography>*/}
                </CardContent>
                <CardActions disableSpacing>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={5} container justify="flex-start">
                            <Typography variant={'h5'} style={{marginLeft: '5%'}}>
                                {DEFAULT_PRICE * numberOfProduct}₪
                            </Typography>
                        </Grid>
                        <Grid item xs={7} container justify="center">
                            <CounterButton productNameSizeKey={props.productNameSize}/>
                        </Grid>
                    </Grid>
                </CardActions>
                <Divider/>
            </Card>
        </div>
    );
}
export default ShoppingCardElement;