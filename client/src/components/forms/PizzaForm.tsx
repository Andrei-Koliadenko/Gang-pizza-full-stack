import React, {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import PizzaSize from "../../models/food/PizzaSize";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {
    getMaxLengthErrorMessage,
    getPositiveErrorMessage,
    getRequiredErrorMessage,
    getTypeErrorMessage
} from "../../util/getErrorMessages";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Food from "../../models/food/Food";
import DropFiles from "../page elements/DropFiles";

export interface PizzaFormInput {
    name: string;
    description: string;
    priceSmall: number;
    priceMedium: number;
    priceLarge: number;
    isVegan: boolean;
    isHot: boolean;
}

const NAME = "\"Name\"";
const DESCRIPTION = "\"Description\"";
const PRICE = "\"Price\"";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 140,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        textFieldTiny: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: 250,
        },
    }),
);
type Props = {
    onSubmit: SubmitHandler<PizzaFormInput>,
    pizza?: Food,
    setFile: any,
}

const PizzaForm: FC<Props> = (props: Props) => {
    const classes = useStyles();
    const onSubmit = props.onSubmit;
    const schema = yup.object().shape({
        name: yup.string().required(getRequiredErrorMessage(NAME)).max(30, getMaxLengthErrorMessage(NAME, 30)),
        description: yup.string().required(getRequiredErrorMessage(DESCRIPTION)).max(300, getMaxLengthErrorMessage(DESCRIPTION, 300)),
        priceSmall: yup.number().typeError(getTypeErrorMessage(PRICE)).positive(getPositiveErrorMessage(PRICE)).required(getRequiredErrorMessage(PRICE)),
        priceMedium: yup.number().typeError(getTypeErrorMessage(PRICE)).positive(getPositiveErrorMessage(PRICE)).required(getRequiredErrorMessage(PRICE)),
        priceLarge: yup.number().typeError(getTypeErrorMessage(PRICE)).positive(getPositiveErrorMessage(PRICE)).required(getRequiredErrorMessage(PRICE)),
    });
    const {handleSubmit, register, errors} = useForm<PizzaFormInput>({
        resolver: yupResolver(schema),
    });
    const [checkBoxState, setCheckBoxState] = useState({
        isHot: props.pizza?.isHot,
        isVegan: props.pizza?.isVegan,
    });
    const {isHot, isVegan} = checkBoxState;
    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckBoxState({...checkBoxState, [event.target.name]: event.target.checked});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth required helperText={errors.name?.message || "Up to 30 symbols"} id="Name"
                       className={classes.textField} label="Name" name="name" inputRef={register}
                       defaultValue={props.pizza?.name} error={!!errors.name?.message}/>
            <br/>
            <TextField fullWidth required helperText={errors.description?.message || "Up to 300 symbols"}
                       id="Description" className={classes.textField} label="Description" name="description"
                       inputRef={register} defaultValue={props.pizza?.description} multiline
                       error={!!errors.description?.message}/>
            <br/>
            <TextField required id={PizzaSize.small} helperText={errors.priceSmall?.message || "Must be positive"}
                       className={classes.textFieldTiny} label={"Price " + PizzaSize.small} type="number"
                       inputRef={register} defaultValue={props.pizza?.price.get(PizzaSize.small)} name="priceSmall"
                       margin="normal" variant="outlined" error={!!errors.priceSmall?.message}/>
            <TextField required id={PizzaSize.medium} helperText={errors.priceMedium?.message || "Must be positive"}
                       className={classes.textFieldTiny} label={"Price " + PizzaSize.medium} type="number"
                       inputRef={register} defaultValue={props.pizza?.price.get(PizzaSize.medium)} name="priceMedium"
                       margin="normal" variant="outlined" error={!!errors.priceMedium?.message}/>
            <TextField required id={PizzaSize.large} helperText={errors.priceLarge?.message || "Must be positive"}
                       className={classes.textFieldTiny} label={"Price " + PizzaSize.large} type="number"
                       inputRef={register} defaultValue={props.pizza?.price.get(PizzaSize.large)} name="priceLarge"
                       margin="normal" variant="outlined" error={!!errors.priceLarge?.message}/>
            <br/>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={isHot} inputRef={register} onChange={handleChangeCheckBox}
                                           name="isHot" color="primary"/>}
                        label="Hot"/>
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={isVegan} inputRef={register} onChange={handleChangeCheckBox}
                                           name="isVegan" color="primary"/>}
                        label="Vegetarian"/>
                </FormGroup>
            </FormControl>
            <DropFiles setFile={props.setFile}/>
            <Divider/>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                Submit
            </Button>
        </form>)
};

export default PizzaForm
