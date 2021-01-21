import React, {useState} from "react";
import {MDBCol, MDBContainer, MDBRow, MDBFooter} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    FACEBOOK_LINK,
    INSTAGRAM_LINK,
    LINKEDIN_LINK,
    PIZZERIA_PHONE_NUMBER,
    PIZZERIA_NAME, PIZZERIA_NAME_CAPS
} from "../../config/contact-Info";
import {PATH_DRINK, PATH_HOME, PATH_PIZZA} from "../../config/links";
import {UserData} from "../../services/auth/AuthService";
import {useSelector} from "react-redux";
import {ReducersType} from "../../store/store";
import SnackBarMessage from "./SnackBarMessage";
import LoginForm from "../forms/LoginForm";

const Footer: React.FC = () => {
    const userData: UserData = useSelector((state: ReducersType) => state.userData);
    const [openLoginFormDialog, setOpenLoginFormDialog] = useState<boolean>(false);
    const [openSnackBarMessage, setOpenSnackBarMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleClickOnLoginButton = (event: React.MouseEvent<HTMLElement>) => {
        if (!userData.email) {
            setOpenLoginFormDialog(true);
        } else {
            const userName = userData.displayName === null ? userData.email : userData.displayName;
            setMessage("You are already logged in, " + userName);
            setOpenSnackBarMessage(true);
        }
    }

    return (
        <MDBFooter
            style={{backgroundImage: 'url("https://image.freepik.com/free-photo/wooden-plank-close-up_53876-92979.jpg")'}}
            className="page-footer font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center ">
                <MDBRow>
                    <MDBCol md="4">
                        <h4 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            Call us:
                        </h4>
                        <h6 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            {PIZZERIA_PHONE_NUMBER}
                        </h6>
                    </MDBCol>
                    <hr className="clearfix w-100 d-md-none"/>
                    <MDBCol md="4">
                        <div className="text-center py-3">
                            <ul className="list-unstyled list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="mb-1">Sign in</h5>
                                </li>
                                <li className="list-inline-item">
                                    <a onClick={handleClickOnLoginButton} className="btn btn-danger btn-rounded">
                                        Login!
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </MDBCol>
                    <hr className="clearfix w-100 d-md-none"/>
                    <MDBCol md="4">
                        <h4 className="text-uppercase mb-4 mt-3 font-weight-bold">
                            {PIZZERIA_NAME_CAPS}
                        </h4>
                        <ul className="list-unstyled">
                            <li style={{fontSize: 17}}>
                                <a href={PATH_HOME}>Home |</a>
                                <a href={PATH_PIZZA}> Pizza |</a>
                                <a href={PATH_DRINK}> Drinks</a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <hr/>
            <div className="text-center">
                <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                        <a href={FACEBOOK_LINK} className="btn-floating btn-sm btn-fb mx-1">
                            <i className="fab fa-facebook-f"/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href={INSTAGRAM_LINK} className="btn-floating btn-sm btn-tw mx-1">
                            <i className="fab fa-instagram"/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href={LINKEDIN_LINK} className="btn-floating btn-sm btn-li mx-1">
                            <i className="fab fa-linkedin-in"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} | {PIZZERIA_NAME} | Israel
                </MDBContainer>
            </div>
            <LoginForm openLoginFormDialog={openLoginFormDialog} setOpenLoginFormDialog={setOpenLoginFormDialog}/>
            <SnackBarMessage openSnackBar={openSnackBarMessage} severity="error" message={message} autoHide={3000}
                             handleCloseSnackBarMessage={() => setOpenSnackBarMessage(false)}
            />
        </MDBFooter>
    );
}
export default Footer;