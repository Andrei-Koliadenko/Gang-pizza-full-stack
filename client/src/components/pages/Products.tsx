import React, {Fragment, useState} from "react";
import {Add} from "@material-ui/icons";
import DisplayProductList from "../page elements/DisplayProductList";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import {createStyles, Fade, Theme} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FoodType from "../../models/food/FoodType";
import getRandomNumber from "../../util/getRandomNumber";
import PizzaSize from "../../models/food/PizzaSize";
import PizzaForm, {PizzaFormInput} from "../forms/PizzaForm";
import DrinkForm, {DrinkFormInput} from "../forms/DrinkForm";
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import DrinkSize from "../../models/food/DrinkSize";
import {serviceProductList} from "../../config/server-config";
import {replacer} from "../../util/mapFunctions";
import toBase64 from "../../util/toBase64";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 140,
        },
    }),
);


const Products: React.FC = () => {
    const classes = useStyles();
    const [addProductFlag, setAddProductFlag] = useState(false);
    const [productType, setProductType] = useState("");
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);
    const [openSnackBarError, setOpenSnackBarError] = useState(false);
    const [file, setFile]: [File | null, any] = useState(null);
    const handleCloseSnackBarSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarSuccess(false);
    };

    const handleCloseSnackBarError = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarError(false);
    };

    const handleChangeSelectorProductType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setProductType(event.target.value as string);
    };

    const handleModalClose = () => {
        setAddProductFlag(false);
    };

    async function onSubmitPizzaForm(data: PizzaFormInput) {
        const sizePriceMap = new Map<string, number>([
            [PizzaSize.small, data.priceSmall],
            [PizzaSize.medium, data.priceMedium],
            [PizzaSize.large, data.priceLarge],
        ]);
        let picture: string = ""
        try {
            if (file) {
                picture = await toBase64(file)
            }
            await serviceProductList.addProduct({
                id: getRandomNumber(1000, 100000),
                name: data.name,
                description: data.description,
                foodType: FoodType.Pizza,
                picture: picture,
                hot: data.isHot,
                isVegan: data.isVegan,
                price: JSON.stringify(sizePriceMap, replacer),
            });
            setOpenSnackBarSuccess(true);
        } catch (error) {
            setOpenSnackBarError(true);
        } finally {
            setAddProductFlag(false);
        }
    }

    const onSubmitDrinkForm = async (data: DrinkFormInput) => {
        const sizePriceMap = new Map<string, number>([
            [DrinkSize.thirdLiter, data.priceThirdLiter],
            [DrinkSize.halfLiter, data.priceHalfLiter],
            [DrinkSize.liter, data.priceLiter],
        ]);
        let picture: string = ""
        try {
            if (file) {
                picture = await toBase64(file)
            }
            await serviceProductList.addProduct({
                id: getRandomNumber(1000, 100000),
                name: data.name,
                description: data.description,
                foodType: FoodType.Drink,
                picture: picture,
                hot: data.isHot,
                isVegan: "undefined",
                price: JSON.stringify(sizePriceMap, replacer),
            });
            setOpenSnackBarSuccess(true);
        } catch (error) {
            setOpenSnackBarError(true);
        } finally {
            setAddProductFlag(false);
        }
    };

    return <Fragment>
        <DisplayProductList/>
        <Grid container spacing={0} justify="center">
            <Grid item xs={11} container justify="center">
                <div>
                    {/*<Fab color="primary" aria-label="add" onClick={() => setAddProductFlag(true)}>*/}
                    <Fab color="primary" aria-label="add" onClick={() => {
                        setAddProductFlag(true)
                    }
                    }>
                        {/*    <Fab color="primary" aria-label="add" onClick={() => products.forEach(product=>serviceProductList.addProduct(product))}>*/}
                        <Add/>
                    </Fab>
                </div>
            </Grid>
        </Grid>
        <Modal
            aria-labelledby="add-product-modal-window"
            aria-describedby="add-product-modal-window"
            className={classes.modal}
            open={addProductFlag}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={addProductFlag}>
                <div className={classes.paper}>
                    <div>
                        {!productType && <Typography variant="h6" gutterBottom>
                            Please choose what type of product you want to add
                        </Typography>}
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="select-product-type">Product</InputLabel>
                            <Select
                                labelId="select-product-type"
                                id="select-product-type"
                                value={productType}
                                onChange={handleChangeSelectorProductType}
                                label="Product"
                                name="foodType"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Pizza"}>Pizza</MenuItem>
                                <MenuItem value={"Drink"}>Drink</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {productType === FoodType.Pizza && <PizzaForm onSubmit={onSubmitPizzaForm} setFile={setFile}/>}
                    {productType === FoodType.Drink && <DrinkForm onSubmit={onSubmitDrinkForm} setFile={setFile}/>}
                </div>
            </Fade>
        </Modal>
        <Snackbar open={openSnackBarSuccess} autoHideDuration={1000} onClose={handleCloseSnackBarSuccess}>
            <Alert onClose={handleCloseSnackBarSuccess} severity="success">
                Product successfully added!
            </Alert>
        </Snackbar>
        <Snackbar open={openSnackBarError} autoHideDuration={1000} onClose={handleCloseSnackBarError}>
            <Alert onClose={handleCloseSnackBarError} severity="error">
                Error! Product wasn't added. Please contact administrator
            </Alert>
        </Snackbar>
    </Fragment>
}
export default Products;