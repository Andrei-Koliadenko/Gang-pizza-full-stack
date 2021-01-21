import React, {FC, useState} from "react";
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import Button from "@material-ui/core/Button";
import {
    getIntegerErrorMessage,
    getMatchErrorMessage,
    getMaxLengthErrorMessage,
    getPositiveErrorMessage,
    getRequiredErrorMessage,
    getTypeErrorMessage
} from "../../util/getErrorMessages";
import PaymentType from "../../models/orders/PaymentType";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import getRandomNumber from "../../util/getRandomNumber";
import {PATH_HOME} from "../../config/links";
import {serviceOrderList, serviceProductList} from "../../config/server-config";
import {useDispatch, useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import Food from "../../models/food/Food";
import Grid from "@material-ui/core/Grid";
import {setClientOrdersList} from "../../store/actions";
import OrderContent from "../../models/orders/OrderContent";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";

export interface OrderFormInput {
    clientName: string;
    phoneNumber: string;
    // orderDeliveryTime: string;
    street: string;
    house: number;
    apartment: number;
    // payment: PaymentType;
    extraInformation: string;
}

const REX_EXP = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
const CLIENT_NAME = "\"Name\"";
const EXTRA_INFORMATION = "\"Extra information\"";
const PHONE_NUMBER = "\"Phone number\"";
const STREET = "\"Street\"";
const HOUSE = "\"House\"";
const APARTMENT = "\"Apartment\"";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        textFieldTiny: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: 250,
        },
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
    }),
);

const OrderForm: FC = () => {
    const classes = useStyles();
    const schema = yup.object().shape({
        clientName: yup.string().required(getRequiredErrorMessage(CLIENT_NAME)).max(30, getMaxLengthErrorMessage(CLIENT_NAME, 30)),
        phoneNumber: yup.string().required(getRequiredErrorMessage(PHONE_NUMBER)).matches(REX_EXP, getMatchErrorMessage(PHONE_NUMBER)),
        extraInformation: yup.string().max(300, getMaxLengthErrorMessage(EXTRA_INFORMATION, 300)),
        street: yup.string().required(getRequiredErrorMessage(STREET)).max(100, getMaxLengthErrorMessage(CLIENT_NAME, 100)),
        house: yup.number().integer(getIntegerErrorMessage(HOUSE)).typeError(getTypeErrorMessage(HOUSE)).positive(getPositiveErrorMessage(HOUSE)).required(getRequiredErrorMessage(HOUSE)),
        apartment: yup.number().integer(getIntegerErrorMessage(APARTMENT)).typeError(getTypeErrorMessage(APARTMENT)).positive(getPositiveErrorMessage(APARTMENT)),
    });
    const clientOrdersList: Map<string, number> = useSelector<ReducersType, Map<string, number>>(state => state.clientOrdersList)
    const productsList: Food[] = serviceProductList.getAllProducts();
    let sumGlobal = 0;
    Array.from(clientOrdersList.keys()).forEach(key => {
        let [id, size] = key.split(',');
        let productByID: Food = productsList.filter(value => value.id.toString() === id)[0];
        let DEFAULT_PRICE = productByID.price.get(size) as number;
        sumGlobal += DEFAULT_PRICE * (clientOrdersList.get(key) as number)
    });


    const dispatch = useDispatch()
    let deliveryTime: string = "";
    const [orderTime, setOrderTime] = useState<Date | null>(new Date());
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);
    const [openSnackBarError, setOpenSnackBarError] = useState(false);
    const userData = useSelector((state: ReducersType) => state.userData);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleModalClose = () => {
        setOpenModal(false);
        window.location.href = '#' + PATH_HOME
    };

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

    async function onSubmit(orderFormInput: OrderFormInput) {
        const now = new Date();
        const afterThreeHours: Date = new Date(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours() + 3, now.getMinutes());
        const orderCreationTime: string = afterThreeHours.toISOString();
        const afterThreeAndHalfHoursTime = new Date(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours() + 3, now.getMinutes() + 30);
        const orderDeliveryTime: string = afterThreeAndHalfHoursTime.toISOString();
        deliveryTime = orderDeliveryTime.slice(11, 16);

        function getOrderFood(): OrderContent[] {
            const arr = new Array<OrderContent>()
            clientOrdersList.forEach((value, key) => {
                let [id, size] = key.split(',');
                let productByID: Food = productsList.filter(value => value.id.toString() === id)[0];
                const productPrice = productByID.price.get(size) as number;
                const orderContent: OrderContent = {
                    name: productByID.name,
                    size: size,
                    price: productPrice,
                    nProducts: value
                }
                arr.push(orderContent)
            })
            return arr;
        }

        try {
            deliveryTime = orderDeliveryTime.slice(11, 16);
            await serviceOrderList.addOrder({
                id: getRandomNumber(1000, 10000),
                clientName: orderFormInput.clientName,
                phoneNumber: orderFormInput.phoneNumber,
                orderCreationTime: orderCreationTime.slice(0, 10) + " " + orderCreationTime.slice(11, 16),
                orderDeliveryTime: orderDeliveryTime.slice(0, 10) + " " + orderDeliveryTime.slice(11, 16),
                clientAddress: {
                    street: orderFormInput.street,
                    house: orderFormInput.house,
                    apartment: orderFormInput.apartment
                },
                isDelivered: false,
                payment: PaymentType.cash,
                extraInformation: orderFormInput.extraInformation,
                orderContent: getOrderFood(),
                totalPrice: sumGlobal,
                clientEmail: userData.email,
            })
            deliveryTime = orderDeliveryTime.slice(11, 16);
            dispatch(setClientOrdersList(new Map<string, number>()))
            setOpenModal(true);
        } catch (error) {
            setOpenSnackBarError(true);
        }
    }

    const {handleSubmit, register, errors} = useForm<OrderFormInput>({
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={"column"} spacing={0} justify="center" style={{flex: 1, alignItems: "stretch"}}>
                <Grid>
                    <TextField required helperText={errors.clientName?.message || "Up to 30 symbols"} id="clientName"
                               className={classes.textField} label="Name" name="clientName" inputRef={register}
                               defaultValue="" error={!!errors.clientName?.message}/>
                    <TextField required helperText={errors.phoneNumber?.message || "e.g. (123) 456 7899"}
                               id="phoneNumber" className={classes.textField} label="Phone number"
                               name="phoneNumber" inputRef={register} defaultValue=""
                               error={!!errors.phoneNumber?.message}/>
                    <br/>
                    <TextField fullWidth multiline required helperText={errors.street?.message || "Up to 100 symbols"}
                               id="street" className={classes.textField} label="Street" name="street"
                               inputRef={register}
                               defaultValue="" error={!!errors.street?.message}/>
                    <br/>
                    <TextField required id="house" helperText={errors.house?.message || "Must be positive"}
                               className={classes.textFieldTiny} label="House" type="number" inputRef={register}
                               defaultValue=""
                               name="house" error={!!errors.house?.message}/>
                    <TextField id="apartment" helperText={errors.apartment?.message || "Must be positive"}
                               className={classes.textFieldTiny} label="Apartment" type="number" inputRef={register}
                               defaultValue="" name="apartment" required
                               error={!!errors.apartment?.message}/>
                    <br/>
                    {/*<TimeSelector orderTime={orderTime} setOrderTime={setOrderTime}/>*/}
                    <TextField fullWidth helperText={errors.extraInformation?.message || "Up to 300 symbols"}
                               id="extraInformation" className={classes.textField} label="Extra information"
                               name="extraInformation" inputRef={register} defaultValue="" multiline
                               error={!!errors.extraInformation?.message}/>
                    <br/><br/>
                </Grid>
                <Grid style={{alignItems: "center", justifyContent: "center"}}>
                    <Button disabled={clientOrdersList.size === 0} onClick={handleSubmit(onSubmit)} variant="contained"
                            color="primary"
                            style={{width: "100%"}}>
                        Order: {sumGlobal}₪
                    </Button>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={classes.paper}>
                        <Typography variant="subtitle1" component={'span'} display="inline">
                            Thank you for your order! We have already started preparing your order!
                        </Typography>
                        <br/>
                        <Button variant="contained" color="primary" onClick={handleModalClose}>
                            OK
                        </Button>
                    </div>
                </Fade>
            </Modal>
            <Snackbar open={openSnackBarSuccess} autoHideDuration={2000} onClose={handleCloseSnackBarSuccess}>
                <Alert onClose={handleCloseSnackBarSuccess} severity="success">
                    Your order has been successfully generated
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackBarError} autoHideDuration={2000} onClose={handleCloseSnackBarError}>
                <Alert onClose={handleCloseSnackBarError} severity="error">
                    ⚠ Error! Your order wasn't generated. Please try again later
                </Alert>
            </Snackbar>
        </form>
    )
}
export default OrderForm
