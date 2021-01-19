import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import {addProductToClientOrdersList, deleteProductFromClientOrdersList} from "../../store/actions";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
                marginBottom: theme.spacing(0),
            },
            '& .MuiBadge-root': {
                marginRight: theme.spacing(4),
            },
        },
    }),
);
type Props = {
    productNameSizeKey: string
}
export default function CounterButton(props: Props) {
    const classes = useStyles();
    const clientOrdersList: Map<string,number> = useSelector<ReducersType, Map<string,number>>(state => state.clientOrdersList)
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <div>
                <Grid container spacing={0} justify="center">
                    <Grid item xs={6} container justify="flex-start" >
                        <Badge color="primary" badgeContent={clientOrdersList.get(props.productNameSizeKey) as number}>
                            <ShoppingCartRoundedIcon fontSize={"default"} />
                        </Badge>
                    </Grid>
                    <Grid item xs={6} container justify="center" style={{justifyContent: "flex-end"}}>
                        <ButtonGroup>
                            <Button
                                aria-label="reduce"
                                onClick={() => {
                                    dispatch(deleteProductFromClientOrdersList(props.productNameSizeKey));
                                }}
                            >
                                <RemoveIcon style={{fontSize: "xx-small"}} />
                            </Button>
                            <Button
                                aria-label="increase"
                                onClick={() => {
                                    dispatch(addProductToClientOrdersList(props.productNameSizeKey));
                                }}
                            >
                                <AddIcon style={{fontSize: "xx-small"}} />
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>


            </div>
        </div>
    );
}