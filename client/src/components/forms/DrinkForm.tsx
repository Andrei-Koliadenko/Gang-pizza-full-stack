import React, {FC, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {
    getMaxLengthErrorMessage, getPositiveErrorMessage,
    getRequiredErrorMessage,
    getTypeErrorMessage
} from "../../util/getErrorMessages";
import {yupResolver} from "@hookform/resolvers/yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import DrinkSize from "../../models/food/DrinkSize";
import Food from "../../models/food/Food";
import DropFiles from "../page elements/DropFiles";

export interface DrinkFormInput {
    name: string;
    description: string;
    priceThirdLiter: number;
    priceHalfLiter: number;
    priceLiter: number;
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
    onSubmit: SubmitHandler<DrinkFormInput>,
    drink?: Food,
    setFile: any,
}

const DrinkForm: FC<Props> = (props: Props) => {
    const classes = useStyles();
    const onSubmit = props.onSubmit;
    const schema = yup.object().shape({
        name: yup.string().required(getRequiredErrorMessage(NAME)).max(30, getMaxLengthErrorMessage(NAME, 30)),
        description: yup.string().required(getRequiredErrorMessage(DESCRIPTION)).max(300, getMaxLengthErrorMessage(DESCRIPTION, 300)),
        priceThirdLiter: yup.number().typeError(getTypeErrorMessage(PRICE)).positive(getPositiveErrorMessage(PRICE)).required(getRequiredErrorMessage(PRICE)),
        priceHalfLiter: yup.number().typeError(getTypeErrorMessage(PRICE)).positive(getPositiveErrorMessage(PRICE)).required(getRequiredErrorMessage(PRICE)),
        priceLiter: yup.number().typeError(getTypeErrorMessage(PRICE)).positive(getPositiveErrorMessage(PRICE)).required(getRequiredErrorMessage(PRICE)),
    });
    const [isHot, setIsHot] = useState(props.drink?.isHot);
    const {handleSubmit, register, errors} = useForm<DrinkFormInput>({
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth required helperText={errors.name?.message || "Up to 30 symbols"} id="Name"
                       className={classes.textField} label="Name" name="name" inputRef={register}
                       defaultValue={props.drink?.name} error={!!errors.name?.message}/>
            <br/>
            <TextField fullWidth required helperText={errors.description?.message || "Up to 300 symbols"}
                       id="Description" error={!!errors.description?.message}
                       className={classes.textField} label="Description" name="description"
                       inputRef={register} defaultValue={props.drink?.description}/>
            <br/>
            <TextField helperText={errors.priceThirdLiter?.message || "Must be positive"}
                       required id={DrinkSize.thirdLiter} className={classes.textFieldTiny}
                       label={"Price " + DrinkSize.thirdLiter} type="number" inputRef={register}
                       defaultValue={props.drink?.price.get(DrinkSize.thirdLiter)} name="priceThirdLiter"
                       margin="normal" variant="outlined" error={!!errors.priceThirdLiter?.message}/>
            <TextField className={classes.textFieldTiny} label={"Price " + DrinkSize.halfLiter} type="number"
                       inputRef={register} defaultValue={props.drink?.price.get(DrinkSize.halfLiter)}
                       margin="normal" variant="outlined" error={!!errors.priceHalfLiter?.message}
                       helperText={errors.priceHalfLiter?.message || "Must be positive"}
                       required id={DrinkSize.halfLiter} name="priceHalfLiter"/>
            <TextField required id={DrinkSize.liter} helperText={errors.priceLiter?.message || "Must be positive"}
                       name="priceLiter" margin="normal" variant="outlined" error={!!errors.priceLiter?.message}
                       className={classes.textFieldTiny} label={"Price " + DrinkSize.liter} type="number"
                       inputRef={register} defaultValue={props.drink?.price.get(DrinkSize.liter)}/>
            <br/>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={isHot} onChange={() => setIsHot(!isHot)}
                                           color="primary" name="isHot"/>} inputRef={register}
                        label="Hot"
                    />
                </FormGroup>
            </FormControl>
            <DropFiles setFile={props.setFile}/>
            <Divider/>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                Submit
            </Button>
        </form>)
};
export default DrinkForm
