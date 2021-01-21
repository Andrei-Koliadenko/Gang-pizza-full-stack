import React, {FC, useState} from "react";
import {IconButton} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import GoogleButton from "react-google-button";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {TransitionProps} from '@material-ui/core/transitions';
import Slide from "@material-ui/core/Slide";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBarMessage from "../page elements/SnackBarMessage";
import LoginCodes from "../../util/LoginCodes";
import {authService} from "../../config/server-config";
import {PATH_ORDERS} from "../../config/links";
import * as yup from "yup";
import {getEmailErrorMessage, getRequiredErrorMessage} from "../../util/getErrorMessages";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Divider from "@material-ui/core/Divider";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface LoginFormInput {
    email: string;
    password: string;
}

const EMAIL = "\"E-mail\"";
const PASSWORD = "\"Password\"";


type Props = {
    openLoginFormDialog: boolean,
    setOpenLoginFormDialog: (openLoginFormDialog: boolean) => void;
}

type SnackBarMessageProps = {
    open: boolean,
    message: string,
    severity: "success" | "info" | "warning" | "error" | undefined,
}

const LoginForm: FC<Props> = (props: Props) => {
    const [snackBarMessageProps, setSnackBarMessageProps] = useState<SnackBarMessageProps>({
        open: false,
        severity: undefined,
        message: "",
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [logging, setLogging] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const schema = yup.object().shape({
        email: yup.string().required(getRequiredErrorMessage(EMAIL)).email(getEmailErrorMessage(EMAIL)),
        password: yup.string().required(getRequiredErrorMessage(PASSWORD))
    });
    const {handleSubmit, register, errors} = useForm<LoginFormInput>({
        resolver: yupResolver(schema),
    });
    const loginFormOnSubmit = async (loginFormInput: LoginFormInput) => {
        setLogging(true);
        const authResult = await authService.login({email: loginFormInput.email, password: loginFormInput.password})
        if (authResult === LoginCodes.OK) {
            // if (userData.isAdmin) {
            //     window.location.href = '#' + PATH_ORDERS;
            // }
            setSnackBarMessageProps({
                open: true,
                message: "Welcome back!",
                severity: "success"
            })
            props.setOpenLoginFormDialog(false);
        } else {
            setSnackBarMessageProps({
                open: true,
                message: "⚠ Error! Wrong credentials!",
                severity: "error"
            })
        }
        setLogging(false);
    }


    const authSocialNetwork = async (authProvider: string) => {
        setLogging(true);
        const loginCode: LoginCodes = await authService.login({email: authProvider, password: ''});
        if (loginCode === LoginCodes.OK) {
            // if (userData.isAdmin) {
            //     window.location.href = '#' + PATH_ORDERS;
            // }
            setSnackBarMessageProps({
                open: true,
                message: "Welcome back!",
                severity: "success"
            })
            props.setOpenLoginFormDialog(false);
        } else {
            setSnackBarMessageProps({
                open: true,
                message: "⚠ Error! Wrong credentials!",
                severity: "error"
            })
        }
        setLogging(false);
    }

    return (<React.Fragment>
        <Dialog open={props.openLoginFormDialog} onClose={() => props.setOpenLoginFormDialog(false)}
                fullScreen={fullScreen} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
            <DialogTitle id="login-form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(loginFormOnSubmit)}>
                    <TextField fullWidth required helperText={errors.email?.message} id="email"
                               label="Email" name="email" inputRef={register}
                               defaultValue={""} error={!!errors.email?.message} variant="outlined"/>
                    <br/>
                    <br/>
                    <TextField fullWidth required helperText={errors.password?.message} variant="outlined"
                               label="Password" name="password" id="password"
                               inputRef={register} defaultValue="" error={!!errors.password?.message}
                               type={showPassword ? 'text' : 'password'}
                               InputProps={{
                                   endAdornment:
                                       <InputAdornment defaultValue={""} position="end">
                                           <IconButton
                                               aria-label="toggle password visibility"
                                               edge="end"
                                               onClick={() => setShowPassword(!showPassword)}
                                               onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                   event.preventDefault()
                                               }}
                                           >
                                               {showPassword ? <Visibility/> : <VisibilityOff/>}
                                           </IconButton>
                                       </InputAdornment>
                               }}
                    />
                    <br/>
                    <br/>
                    <GoogleButton
                        type="dark" onClick={() => authSocialNetwork('google')}
                    />
                    <br/>
                    <Divider/>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSubmit(loginFormOnSubmit)} fullWidth
                        disabled={logging}>
                    {logging && <CircularProgress size={24} style={{marginRight: 10, marginLeft: 0}}/>}
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
        <SnackBarMessage openSnackBar={snackBarMessageProps.open} severity={snackBarMessageProps.severity}
                         message={snackBarMessageProps.message} autoHide={3000}
                         handleCloseSnackBarMessage={() => setSnackBarMessageProps({
                             open: false,
                             message: "",
                             severity: undefined
                         })}
        />
    </React.Fragment>)
}
export default LoginForm