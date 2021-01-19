import React, {useState} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import LoginForm, {LoginFormInput} from "../forms/LoginForm";
import {spinnerState} from "../../store/actions";
import {authService} from "../../config/server-config";
import LoginCodes from "../../util/LoginCodes";
import {useDispatch, useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Modal} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
            position: 'fixed',
            top: 0,
            width: "100%",
            backgroundImage: "url('https://image.freepik.com/free-photo/abstract-surface-wood-texture-background_74190-12071.jpg')",
            color: "#000000",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        sectionDesktop: {

            display: 'none',
            '@media (min-width:945px)': {

                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            '@media (min-width:945px)': {
                display: 'none',
            },
        },
        sectionMobileGangImage: {
            '@media (max-width:415px)': {
                width: 150,
            },
            '@media (max-width:315px)': {
                width: 100,
            },
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




const Footer = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const userData = useSelector((state: ReducersType) => state.userData);
    const [modalLoginForm, setModalLoginForm] = useState(false)
    const [openSnackBarError, setOpenSnackBarError] = useState<boolean>(false);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const loginFormOnSubmit = async (loginFormInput: LoginFormInput) => {
        dispatch(spinnerState(true));
        const authResult = await authService.login({email: loginFormInput.email, password: loginFormInput.password})
        if (authResult === LoginCodes.OK) {
            setModalLoginForm(false);
        } else {
            setOpenSnackBarError(true);
        }
        dispatch(spinnerState(false));
    }

    async function authSocialNetwork(authProvider: string) {
        dispatch(spinnerState(true));
        const loginCode: LoginCodes = await authService.login({email: authProvider, password: ''});
        if(loginCode !== LoginCodes.OK) {
            alert("Wrong authentication")
        } else {
            setModalLoginForm(false);
        }
        dispatch(spinnerState(false))
    }

    const handleLoginModalClose = () => {
        setModalLoginForm(false);
    }
    const handleLoginIcon = (event: React.MouseEvent<HTMLElement>) => {
        if (!userData.user) {
            setModalLoginForm(true);
        } else {
            handleProfileMenuOpen(event);
        }
    }






    return (
        <MDBFooter style={{backgroundImage: 'url("https://image.freepik.com/free-photo/wooden-plank-close-up_53876-92979.jpg")'}} className="page-footer font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            call us: 8-800-555-35-35
                        </h5>
                    </MDBCol>
                    <hr className="clearfix w-100 d-md-none" />
                    <MDBCol md="1">


                    </MDBCol>
                    {/*<hr className="clearfix w-100 d-md-none" />*/}
                    <MDBCol md="2">

                    </MDBCol>
                    {/*<hr className="clearfix w-100 d-md-none" />*/}
                    <MDBCol md="3" >
                        <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            247 GANG PIZZA
                        </h5>
                        <ul className="list-unstyled">
                            <li style={{fontSize: 17}}>
                                <a href="#">Home |</a>
                                <a href="#pizza"> Pizza |</a>
                                <a href="#drinks"> Drinks</a>
                            </li>
                            {/*<li>*/}
                            {/*    <a href="#pizza">Pizza</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="#drinks">Drinks</a>*/}
                            {/*</li>*/}
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <hr />
            <div className="text-center py-3">
                <ul className="list-unstyled list-inline mb-0">
                    <li className="list-inline-item">
                        <h5 className="mb-1">Register for free</h5>
                    </li>
                    <li className="list-inline-item">
                        <a onClick={handleLoginIcon}  className="btn btn-danger btn-rounded">
                            Sign up!
                        </a>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="text-center">
                <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                        <a href='https://www.facebook.com/' className="btn-floating btn-sm btn-fb mx-1">
                            <i onClick={()=>window.location.assign('https://www.instagram.com/danilhvr/?hl=ru')}className="fab fa-facebook-f"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href='https://twitter.com/' className="btn-floating btn-sm btn-tw mx-1">
                            <i className="fab fa-twitter"> </i>
                        </a>
                    </li>
                    {/*<li className="list-inline-item">*/}
                    {/*    <a href='https://www.instagram.com/danilhvr/?hl=ru' className="btn-floating btn-sm btn-gplus mx-1">*/}
                    {/*        <i className="fab fa-google-plus"> </i>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    <li  className="list-inline-item">
                        <a href='https://www.linkedin.com/' className="btn-floating btn-sm btn-li mx-1">
                            <i className="fab fa-linkedin-in"> </i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} | 247 Gang Pizza | Israel
                </MDBContainer>
            </div>
            <Modal
                aria-labelledby="modal-login"
                aria-describedby="modal-login-description"
                className={classes.modal}
                open={modalLoginForm}
                onClose={handleLoginModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalLoginForm}>
                    <div className={classes.paper}>
                        <LoginForm onSubmit={loginFormOnSubmit} authSocialNetwork={authSocialNetwork}/>
                    </div>
                </Fade>
            </Modal>
        </MDBFooter>

    );
}

export default Footer;