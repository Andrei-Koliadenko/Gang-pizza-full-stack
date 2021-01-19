import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import {menuProps} from "../menu/menuTabs";
import SideMenu from "../menu/SideMenu";
import logo from "../../util/images/gang-logo.png";
import TopMenu from "../menu/TopMenu";
import PopperShoppingCard from "../cards/PopperShoppingCard";
import {useDispatch, useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import {Grid, Modal} from "@material-ui/core";
import LoginForm, {LoginFormInput} from "../forms/LoginForm";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import LoginCodes from "../../util/LoginCodes";
import {authService} from "../../config/server-config";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {spinnerState} from "../../store/actions";
import {PATH_HOME} from "../../config/links";

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

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const userData = useSelector((state: ReducersType) => state.userData);
    const [modalLoginForm, setModalLoginForm] = useState(false)
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState<boolean>(false);
    const [openSnackBarError, setOpenSnackBarError] = useState<boolean>(false);
    const [openSnackBarLogout, setOpenSnackBarLogout] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>(userData.user)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
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

    const handleCloseSnackBarLogout = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarLogout(false);
    };

    function handleMenuLogout() {
        dispatch(spinnerState(true))
        setUserName(userData.user);
        if(userData.isAdmin) {
            window.location.href = '#' + PATH_HOME;
        }
        setOpenSnackBarLogout(true);
        authService.logout().then();
        handleMenuClose();
        dispatch(spinnerState(false))
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            //keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <SideMenu menu={menuProps} onClickLogin={handleLoginIcon}/>
            </MenuItem>
        </Menu>
    );
    return (
        <div >
            <br/><br/><br/><br/>
            <AppBar className={classes.grow}>
                <Toolbar style={{justifyContent: "flex-end"}}>
                    <Grid container spacing={0} justify="flex-end">
                        <Grid item xs={3} container justify="flex-start" >
                            <a href="#"><img className={classes.sectionMobileGangImage} src={logo} alt="logo"/></a>
                        </Grid>
                        <Grid item xs={5} container style={{alignItems: "center", justifyContent: "center"}} >
                            <div className={classes.sectionDesktop}>
                                {<TopMenu menu={menuProps}/>}
                                {/*<IconButton*/}
                                {/*    edge="end"*/}
                                {/*    aria-label="night mode"*/}
                                {/*    color="inherit"*/}
                                {/*>*/}
                                {/*    <Brightness4Outlined fontSize="large"/>*/}
                                {/*</IconButton>*/}

                            </div>
                        </Grid>

                        <Grid item xs={4} container style={{alignItems: "center", justifyContent: "flex-end"}} >
                            <IconButton className={classes.sectionDesktop}  style={{marginRight: 10}}
                                         edge="end"
                                         aria-label="account of current user"
                                         aria-controls='primary-search-account-menu'
                                         aria-haspopup="true"
                                         onClick={handleLoginIcon}
                                         color="inherit"
                            >
                                <AccountCircle fontSize="large"/>
                            </IconButton>
                            <PopperShoppingCard/>
                        </Grid>
                    </Grid>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
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
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Snackbar open={openSnackBarSuccess} autoHideDuration={3000} onClose={handleCloseSnackBarSuccess}>
                <Alert onClose={handleCloseSnackBarSuccess} severity="success">
                    Wellcome back, {userName}!
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackBarError} autoHideDuration={3000} onClose={handleCloseSnackBarError}>
                <Alert onClose={handleCloseSnackBarError} severity="error">
                    ⚠ Error! Either email or password was wrong!
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackBarLogout} autoHideDuration={3000} onClose={handleCloseSnackBarLogout}>
                <Alert onClose={handleCloseSnackBarLogout} severity="info">
                    Bye, {userName}!
                </Alert>
            </Snackbar>
            <br/>
        </div>
    );
}
export default Header;