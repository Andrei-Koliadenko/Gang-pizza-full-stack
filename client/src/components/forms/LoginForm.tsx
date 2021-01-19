import React, {FC, useState} from "react";
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {
    getRequiredErrorMessage,
    getEmailErrorMessage,
} from "../../util/getErrorMessages";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import GoogleButton from 'react-google-button'

export interface LoginFormInput {
    email: string;
    password: string;
}

const EMAIL = "\"E-mail\"";
const PASSWORD = "\"Password\"";

type Props = {
    onSubmit: any;
    authSocialNetwork: any;
}

const LoginForm: FC<Props> = (props: Props) => {
    const schema = yup.object().shape({
        email: yup.string().required(getRequiredErrorMessage(EMAIL)).email(getEmailErrorMessage(EMAIL)),
        password: yup.string().required(getRequiredErrorMessage(PASSWORD))
    });
    const {handleSubmit, register, errors} = useForm<LoginFormInput>({
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <Typography variant="h6">
                Login
            </Typography>
            <br/>
            <TextField fullWidth required helperText={errors.email?.message} id="email"
                       label="Email" name="email" inputRef={register}
                       defaultValue={""} error={!!errors.email?.message} variant="outlined"/>
            <br/><br/>
            <TextField fullWidth required helperText={errors.password?.message} variant="outlined"
                       label="Password" name="password" id="password"
                       inputRef={register} defaultValue="" error={!!errors.password?.message}
                       type={showPassword ? 'text' : 'password'}
                       InputProps={{
                           endAdornment:
                               <InputAdornment defaultValue={""} position="end">
                                   <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={handleClickShowPassword}
                                       onMouseDown={handleMouseDownPassword}
                                       edge="end"
                                   >
                                       {showPassword ? <Visibility/> : <VisibilityOff/>}
                                   </IconButton>
                               </InputAdornment>
                       }}
            />
            <br/><br/>
            <GoogleButton
                type="dark"
                onClick={() => props.authSocialNetwork('google')}
            />
            <Divider/>
            <br/>
            <Button onClick={handleSubmit(props.onSubmit)} variant="contained" color="primary">
                Submit
            </Button>
        </form>)
};

export default LoginForm
