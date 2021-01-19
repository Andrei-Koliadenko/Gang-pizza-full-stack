import React, {Fragment, useRef, useState} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {Backdrop, Fade, Modal} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {ReducersType} from "../../store/store";
import Food from "../../models/food/Food";
import FoodView from "../../models/food/FoodView";
import {DataTable, HeaderDescription} from "./DataTable";
import {headersAll, headersWidth} from "../../config/products-table-config";
import ErrorTypes from "../../util/ErrorTypes";
import ConfirmationDialog from "./ConfirmDialog";
import PizzaForm, {PizzaFormInput} from "../forms/PizzaForm";
import FoodType from "../../models/food/FoodType";
import PizzaSize from "../../models/food/PizzaSize";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import DrinkForm, {DrinkFormInput} from "../forms/DrinkForm";
import DrinkSize from "../../models/food/DrinkSize";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import {serviceProductList} from "../../config/server-config";
import {replacer} from "../../util/mapFunctions";
import FoodServer from "../../models/food/FoodServer";
import toBase64 from "../../util/toBase64";
import {spinnerState} from "../../store/actions";

// function toFoodFromFoodView(product: FoodView): food {
//
//     return {
//         foodType: product.foodType,
//         picture: product.picture,
//         price: product.price,
//         description: product.description,
//         name: product.name,
//         id: product.id,
//         hot: ,
//         isVegan: ,
//     };
// }

function priceViewFromPriceMap(arrayOfArrays: Map<string, number>): any {
    let res: string[] = [];
    arrayOfArrays.forEach((value, key) => {
        let str: string = key + ': ' + value;
        res.push(str);
    })
    return res.join(';\n ');
}

export function toFoodViewFromFood(product: Food): FoodView {
    return {
        food: product,
        foodType: product.foodType,
        picture: <img style={{height: '75px'}} src={product.picture} alt={"pic"}/>,
        price: priceViewFromPriceMap(product.price),
        description: product.description,
        name: product.name,
        id: product.id,
        hot: product.isHot ? <CheckCircleRoundedIcon style={{color: 'green'}}/> :
            <CancelRoundedIcon style={{color: 'red'}}/>,
        isVegan: product.foodType === FoodType.Pizza ? product.isVegan ?
            <CheckCircleRoundedIcon style={{color: 'green'}}/> : <CancelRoundedIcon style={{color: 'red'}}/> : ''
    };
}


export function toFoodsView(foods: Food[]): FoodView[] {
    return foods.map(toFoodViewFromFood);
}

const useStyles = makeStyles((theme: Theme) =>
    ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            // border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },

    }));

export function getHeaders(width: number): Map<string, HeaderDescription> {
    const headersWidthArray = headersWidth;
    const index = headersWidthArray.findIndex(hw => width > hw[0]);
    return headersWidthArray[index][1];
}

const DisplayProductList: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const width: number = useSelector((state: ReducersType) => state.width);
    const products: Food[] = serviceProductList.getAllProducts();
    const [open, setOpen] = useState<boolean>(false);
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = React.useState(false);
    const [openSnackBarError, setOpenSnackBarError] = React.useState(false);
    const [modal, setModal] = useState<{
        open: boolean,
        product: Food | undefined
    }>({
        open: false,
        product: undefined
    });
    const idRef = useRef<number>(0);
    const headers: Map<string, HeaderDescription> = getHeaders(width);

    function removeProduct(productObj: object) {
        idRef.current = (productObj as Food).id
        setOpen(true);
    }

    async function onClose(res: boolean) {
        setOpen(false);
        if (res) {
            try {
                await serviceProductList.removeProduct(idRef.current);
            } catch (error) {
                const errorEnum: ErrorTypes = error as ErrorTypes;
                const alertMessage = errorEnum === ErrorTypes.SERVER_ERROR ?
                    `Employee with id ${idRef.current} doesn't exist` :
                    'Server is not available, please repeat later';
                alert(alertMessage);
            }
        }
    }

    function handleModalClose() {
        modal.open = false;
        setModal({...modal});
    }

    async function editProduct(obj: object) {
        const product = obj as FoodView;
        //const food: food = getFoodfromFoodView(product);
        setModal({open: true, product: product.food});
    }

    // async function updateProduct(product: food): Promise<string> {
    //     //     try {
    //     //         await serviceProductList.updateProduct(product.id,
    //     //             product);
    //     //         !!props.refreshFn && props.refreshFn();
    //     //         handleModalClose();
    //     //         return '';
    //     //     } catch (error) {
    //     //         return (error as ErrorTypes) ===
    //     //         ErrorTypes.SERVER_ERROR ? `Employee with id: ${product.id} doesn't exist` :
    //     //             'Server is not available, please repeat later';
    //     //     }
    //     // }
    //
    //     serviceProductList.updateProduct(product.id, product);
    //     handleModalClose();
    //     return '';
    // }

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

    const [file, setFile]: [File | null, any] = useState(null);

    async function updatePizza(pizzaFormInput: PizzaFormInput) {
        handleModalClose();

        if (modal.product?.id) {
            try {
                dispatch(spinnerState(true))
                const sizePriceMap = new Map<string, number>([
                    [PizzaSize.small, pizzaFormInput.priceSmall],
                    [PizzaSize.medium, pizzaFormInput.priceMedium],
                    [PizzaSize.large, pizzaFormInput.priceLarge],
                ]);
                let picture: string = modal.product.picture
                if (file) {
                    picture = await toBase64(file)
                }
                const updatedPizza: FoodServer = {
                    id: modal.product.id,
                    foodType: FoodType.Pizza,
                    name: pizzaFormInput.name,
                    description: pizzaFormInput.description,
                    hot: pizzaFormInput.isHot,
                    isVegan: pizzaFormInput.isVegan,
                    picture: picture,
                    price: JSON.stringify(sizePriceMap, replacer),
                }
                await serviceProductList.updateProduct(modal.product.id, updatedPizza);
                setOpenSnackBarSuccess(true);
            } catch (error) {
                setOpenSnackBarError(true);
            } finally {
                dispatch(spinnerState(false))
            }
        } else {
            setOpenSnackBarError(true);
        }
    }

    async function updateDrink(drinkFormInput: DrinkFormInput) {
        handleModalClose();
        if (modal.product?.id) {
            try {
                dispatch(spinnerState(true))
                const sizePriceMap = new Map<string, number>([
                    [DrinkSize.thirdLiter, drinkFormInput.priceThirdLiter],
                    [DrinkSize.halfLiter, drinkFormInput.priceHalfLiter],
                    [DrinkSize.liter, drinkFormInput.priceLiter],
                ]);
                let picture: string = modal.product.picture
                if (file) {
                    picture = await toBase64(file)
                }
                const updatedDrink: FoodServer = {
                    id: modal.product.id,
                    foodType: FoodType.Drink,
                    name: drinkFormInput.name,
                    description: drinkFormInput.description,
                    hot: drinkFormInput.isHot,
                    picture: picture,
                    price: JSON.stringify(sizePriceMap, replacer),
                    isVegan: "undefined",
                }
                await serviceProductList.updateProduct(modal.product.id, updatedDrink)
                setOpenSnackBarSuccess(true);
            } catch (error) {
                setOpenSnackBarError(true);
            } finally {
                dispatch(spinnerState(false))
            }
        } else {
            setOpenSnackBarError(true);
        }
    }


    return <Fragment>
        <DataTable defaultRowsPerPage={width > 500 && width < 900 ? 5 : 10}
                   innerWidth={width < 700 ? width : undefined} isDetails={headers !== headersAll}
                   headers={headers} rows={toFoodsView(products)}
                   actions={[{icon: <DeleteIcon/>, actionFn: removeProduct},
                       {icon: <EditIcon/>, actionFn: editProduct}]}/>
        <ConfirmationDialog title={'Are you sure?'} open={open} content={``} onClose={onClose}/>
        <Modal
            className={classes.modal}
            open={modal.open}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={modal.open}>
                <div className={classes.paper}>
                    {modal.product?.foodType === FoodType.Pizza &&
                    <PizzaForm onSubmit={updatePizza} pizza={modal.product} setFile={setFile}/>}
                    {modal.product?.foodType === FoodType.Drink &&
                    <DrinkForm onSubmit={updateDrink} drink={modal.product} setFile={setFile}/>}
                </div>
            </Fade>
        </Modal>
        <Snackbar open={openSnackBarSuccess} autoHideDuration={1000} onClose={handleCloseSnackBarSuccess}>
            <Alert onClose={handleCloseSnackBarSuccess} severity="success">
                Product successfully updated!
            </Alert>
        </Snackbar>
        <Snackbar open={openSnackBarError} autoHideDuration={1000} onClose={handleCloseSnackBarError}>
            <Alert onClose={handleCloseSnackBarError} severity="error">
                ⚠ Error! Product wasn't updated. Please contact administrator
            </Alert>
        </Snackbar>
    </Fragment>
}

export default DisplayProductList;