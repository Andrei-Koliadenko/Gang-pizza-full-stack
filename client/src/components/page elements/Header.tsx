import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import {menuProps} from "../menu/menuTabs";
import SideMenu from "../menu/SideMenu";
import logo from "../../util/images/gang-logo.png";
import TopMenu from "../menu/TopMenu";
import PopperShoppingCard from "../cards/PopperShoppingCard";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import {Grid} from "@material-ui/core";
import {authService} from "../../config/server-config";
import {PATH_HOME} from "../../config/links";
import LoginForm from "../forms/LoginForm";
import Avatar from "@material-ui/core/Avatar";
import {UserData} from "../../services/auth/AuthService";
import SnackBarMessage from "./SnackBarMessage";

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
        avatarBackColor: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
);

const Header: React.FC = () => {
    const classes = useStyles();
    const [openSnackBarMessage, setOpenSnackBarMessage] = useState<boolean>(false);
    const [openLoginFormDialog, setOpenLoginFormDialog] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [message, setMessage] = useState<string>("");
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const userData: UserData = useSelector((state: ReducersType) => state.userData);
    const mobileMenuId = 'menu-mobile';

    const handleClickOnLoginIcon = (event: React.MouseEvent<HTMLElement>) => {
        if (!userData.email) {
            setOpenLoginFormDialog(true);
        } else {
            handleProfileMenuOpen(event);
        }
    }

    const handleMenuLogout = () => {
        const userName = userData.displayName === null ? userData.email : userData.displayName;
        if (userData.isAdmin) {
            window.location.href = '#' + PATH_HOME;
        }
        setMessage("Bye, " + userName);
        setOpenSnackBarMessage(true);
        authService.logout().then();
        handleMenuClose();
    }

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
                <SideMenu menu={menuProps} onClickLogin={handleClickOnLoginIcon}/>
            </MenuItem>
        </Menu>
    );
    return (<div>
        <br/><br/><br/><br/>
        <AppBar className={classes.grow}>
            <Toolbar style={{justifyContent: "flex-end"}}>
                <Grid container spacing={0} justify="flex-end">
                    <Grid item xs={3} container justify="flex-start">
                        <a href="/#"><img className={classes.sectionMobileGangImage} src={logo} alt="logo"/></a>
                    </Grid>
                    <Grid item xs={5} container style={{alignItems: "center", justifyContent: "center"}}>
                        <div className={classes.sectionDesktop}>
                            {<TopMenu menu={menuProps}/>}
                        </div>
                    </Grid>

                    <Grid item xs={4} container style={{alignItems: "center", justifyContent: "flex-end"}}>
                        <IconButton className={classes.sectionDesktop} style={{marginRight: 10}}
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls='primary-search-account-menu'
                                    aria-haspopup="true"
                                    onClick={handleClickOnLoginIcon}
                                    color="inherit"
                        >
                            <Avatar alt="login-avatar" src={userData.avatarURL} className={classes.avatarBackColor}/>
                        </IconButton>
                        <PopperShoppingCard/>
                    </Grid>
                </Grid>
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={(event: React.MouseEvent<HTMLElement>) => {
                            setMobileMoreAnchorEl(event.currentTarget)
                        }}
                        color="inherit"
                    >
                        <MoreIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <LoginForm openLoginFormDialog={openLoginFormDialog} setOpenLoginFormDialog={setOpenLoginFormDialog}/>
        <SnackBarMessage openSnackBar={openSnackBarMessage} severity="success" message={message} autoHide={3000}
                         handleCloseSnackBarMessage={() => setOpenSnackBarMessage(false)}
        />
    </div>);
}
export default Header;